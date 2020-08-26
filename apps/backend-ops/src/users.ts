/**
 * Tooling to setup the firebase project before running tests.
 *
 * This module provides functions to trigger a firestore restore and test user creations.
 */
import { differenceBy } from 'lodash';
import { Auth, loadAdminServices, UserRecord } from './admin';
import { sleep } from './tools';
import readline from 'readline';
import { upsertWatermark, runChunks, JsonlDbRecord , getCollection} from '@blockframes/firebase-utils';
import { startMaintenance, endMaintenance, isInMaintenance } from '@blockframes/firebase-utils';
import { loadDBVersion } from './migrations';
import { firebase } from '@env';
import { User } from '@blockframes/user/types';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
export const { storageBucket } = firebase;

export interface UserConfig {
  uid: string;
  email: string;
  password: string;

  [key: string]: any;
}

export const USER_FIXTURES_PASSWORD = 'blockframes';

/**
 * This function will generate `tools/users.fixture.json` from users currently in Firestore
 */
export async function generateUserFixtures() {
  console.log('Generating user fixtures file from Firestore...')

  console.time('Fetching users from Firestore')
  const users = await getCollection<User>('users');
  console.timeEnd('Fetching users from Firestore')

  const output = users.map(user => ({
    email: user.email,
    uid: user.uid,
    password: USER_FIXTURES_PASSWORD,
  }));
  const dest = join(process.cwd(), 'tools', 'users.fixture.json');
  await fsPromises.writeFile(dest, JSON.stringify(output));
  console.log('Fixture saved:', dest)
}

/**
 * @param auth  Firestore Admin Auth object
 * @param userConfig
 */
async function createUserIfItDoesntExists(auth: Auth, userConfig: UserConfig): Promise<UserRecord> {
  const { uid, email } = userConfig;
  try {
    console.log('trying to get user:', uid, email);
    // await here to catch the error in the try / catch scope
    return await auth.getUser(uid);
  } catch {
    console.log('creating user:', uid, email);
    return await auth.createUser(userConfig);
  }
}

/**
 * Create all users defined in the users.fixture file
 *
 * @param users The list of users to create if they do not exists.
 * @param auth  Firestore Admin Auth object
 */
async function createAllUsers(users: UserConfig[], auth: Auth): Promise<any> {
  // TODO: #3514
  // ! Ensure there are no duplicates!
  const ps = users
    .filter((user) => {
      const dupe = users.filter((compareUser) => compareUser.email === user.email);
      return dupe.length === 1;
    })
    .map((user) => createUserIfItDoesntExists(auth, user));
  return Promise.all(ps);
}

/**
 * Remove all users that are not in the list of expected users.
 *
 * @param expectedUsers
 * @param auth
 */
export async function removeUnexpectedUsers(expectedUsers: UserConfig[], auth: Auth): Promise<any> {
  let pageToken;

  do {
    const result = await auth.listUsers(1000, pageToken);

    const users = result.users;
    pageToken = result.pageToken;

    // users - expected users => users that we don't want in the database.
    const usersToRemove = differenceBy(users, expectedUsers, 'uid', 'email');

    // Note: this is usually bad practice to await in a loop.
    // In this VERY SPECIFIC case we just want to remove the user
    // and wait for some time to avoid exceeding Google's quotas.
    // This is "good enough", but do not reproduce in frontend / backend code.
    for (const user of usersToRemove) {
      console.log('removing user:', user.email, user.uid);
    }
    await auth.deleteUsers(usersToRemove.map((user) => user.uid));
    await sleep(100);
  } while (pageToken);

  return;
}

function readUsersFromDb(db: JsonlDbRecord[]): UserConfig[] {
  return db
    .filter((doc) => doc.docPath.includes('users/'))
    .filter((userDoc) => 'email' in userDoc.content)
    .map((userDoc) => ({
      uid: userDoc.content?.uid,
      email: userDoc.content?.email,
      password: USER_FIXTURES_PASSWORD,
    }));
}

export async function syncUsers(db: JsonlDbRecord[]): Promise<any> {
  await startMaintenance();
  const { auth } = loadAdminServices();

  const expectedUsers = readUsersFromDb(db);
  await removeUnexpectedUsers(expectedUsers, auth);
  await createAllUsers(expectedUsers, auth);
  await endMaintenance();
}

export async function printUsers(): Promise<any> {
  const { auth } = loadAdminServices();

  let pageToken;

  do {
    const result = await auth.listUsers(1000, pageToken);
    const users = result.users;
    pageToken = result.pageToken;

    users.forEach((u) => {
      console.log(JSON.stringify(u.toJSON()));
    });
  } while (pageToken);
}

export async function clearUsers(): Promise<any> {
  const { auth } = loadAdminServices();

  // clear users is equivalent to "we expect no users", we can reuse the code.
  return removeUnexpectedUsers([], auth);
}

function readUsersFromSTDIN(): Promise<UserConfig[]> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  // We push all the users from stdin to this array.
  // Later use a worker queue or a generator.
  const users = [];
  let failed = false;

  return new Promise((resolve, reject) => {
    // read the lines sent from stdin and parse them as JSON.
    // on error, toggle the `failed' flag and ignore all lines, we're going to exit.
    rl.on('line', (line) => {
      if (failed || line === '') {
        return;
      }

      try {
        users.push(JSON.parse(line));
      } catch (error) {
        reject(error);
        failed = true;
        rl.close();
        return;
      }
    });

    rl.on('close', async () => {
      if (failed) {
        return;
      }

      // When stdin gets closed
      resolve(users);
    });
  });
}

export async function createUsers(): Promise<any> {
  const { auth } = loadAdminServices();
  const users = await readUsersFromSTDIN();
  const usersWithPassword = users.map((user) => ({ ...user, password: 'password' }));
  return createAllUsers(usersWithPassword, auth);
}

export async function generateWatermarks() {
  const { db } = loadAdminServices();
  const dbVersion = await loadDBVersion(db);
  // activate maintenance to prevent cloud functions to trigger
  let startedMaintenance = false;
  if (!(await isInMaintenance(0))) {
    startedMaintenance = true;
    await startMaintenance();
  }

  const users = await db.collection('users').get();

  await runChunks(users.docs, async (user) => {
    const file = await upsertWatermark(user.data(), storageBucket);
    // We are in maintenance mode, trigger are stopped
    // so we update manually the user document
    if (dbVersion < 31) {
      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-3000',
        version: 'v2',
      });
      const watermark = { ref: file.name, url: signedUrl };
      await user.ref.update({ watermark });
    } else {
      await user.ref.update({ watermark: file.name });
    }
  });

  // deactivate maintenance
  if (startedMaintenance) await endMaintenance();
}

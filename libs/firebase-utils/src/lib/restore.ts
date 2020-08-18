import { backupBucket } from '@env';
import * as readline from 'readline';
import { storage, firestore } from 'firebase-admin';
import { startMaintenance, endMaintenance } from './maintenance';
import { clearDB } from './clear';

export async function restore() {
  const db = firestore();
  const bucket = storage().bucket(backupBucket);
  const [ files ] = await bucket.getFiles();

  if (!files.length) {
    throw new Error('nothing to restore, leaving')
  }

  const file = files.sort((a, b) => a.metadata?.timeCreated - b.metadata?.timeCreated).pop();

  console.info('Updating restore flag');
  await startMaintenance();

  console.info('Clearing the database');
  await clearDB();  // Clear the database after getting the content just in case.

  console.info('restoring file:', file.name);
  const stream = file.createReadStream();
  const lineReader = readline.createInterface({
    input: stream,
    terminal: false
  });

  const promises: Promise<any>[] = [];

  const readerDone = new Promise(resolve => {
    lineReader.on('close', resolve);
  });

  stream.on('end', () => {
    lineReader.close();
  });

  // TODO: make this part scalable too, we're going to load the file
  // and create promises "as fast as possible", we should backpressure the
  // callback somehow to make sure the X previous promises have been completed
  // before adding more. This will protect us from memory overflow (similar
  // to the note in the backup code).
  lineReader.on('line', line => {
    const { docPath, content } = JSON.parse(line);
    const doc = reEncodeObject(content);
    const update = db.doc(docPath).set(doc);
    promises.push(update);
  });

  promises.push(readerDone);
  await Promise.all(promises);

  await endMaintenance();

  console.info(`Done processing: ${promises.length - 1} lines loaded`);
};


/**
 * Take a json object and re-encode its content to match our firebase storage.
 *
 * For example: transform {_second, _nanoseconds} objects back to firestore timestamps
 * objects.
 *
 * @param doc the object to reencode
 */
function reEncodeObject(doc: object): any {
  if (!doc) {
    return; // Make sure null is removed
  }
  if (Array.isArray(doc)) {
    return doc.map(reEncodeObject);
  }
  if (typeof doc === 'object') {
    if (isTimestampObject(doc)) {
      return new firestore.Timestamp(doc._seconds, doc._nanoseconds); // Reencode Timestamp
    }
    // Recursively reencode docs
    const encoded = {};
    for (const key in doc) {
      encoded[key] = reEncodeObject(doc[key])
    }
    return encoded;
  }
  return doc;
}

function isTimestampObject(value): value is { _seconds: number, _nanoseconds: number } {
  return '_seconds' in value && '_nanoseconds' in value;
}
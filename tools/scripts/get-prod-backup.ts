import { backupBucket, firebase } from '../../env/env.prod';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as admin from 'firebase-admin';
import { config } from 'dotenv';
config();

admin.initializeApp({
  storageBucket: backupBucket,
  projectId: firebase.projectId,
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
});
const storage = admin.storage();
const folder = join(process.cwd(), 'tmp');

async function getProdBackup() {
  try {
    // Get latest backup DB
    const [ files ] = await storage.bucket(backupBucket).getFiles();
    const last = files.sort((a, b) => a.metadata?.timeCreated - b.metadata?.timeCreated).pop();
    console.log('Latest backup:', last.metadata.timeCreated);

    // Ensure parent folder exist
    if(!existsSync(folder)) {
      mkdirSync(folder);
    }

    // Dowload lastest backup
    const destination = join(folder, last.name);
    await last.download({ destination });
    console.log('Backup has been saved to:', destination);

  } catch (err) {
    if ('errors' in err) {
      err.errors.forEach(error => console.error('ERROR:', error.message));
    } else{
      console.log(err)
    } 
  }
}

getProdBackup().then(() => process.exit(0));
import { loadAdminServices } from './admin';
import { getStorageBucketName, db } from 'apps/backend-functions/src/internals/firebase';
import { getDocAndPath } from 'apps/backend-functions/src/media';
import { getCollection } from 'apps/backend-functions/src/data/internals';
import { createHostedMedia } from '@blockframes/media/+state/media.model';
import { has, get } from 'object-path';
import { startMaintenance, endMaintenance, isInMaintenance } from 'apps/backend-functions/src/maintenance';

enum mediaFieldType {
  hostedMedia,
  recordOfHostedMedia
}

// reference to the location of all hosted medias in the db
const mediaReferences = [
  { 
    collection: 'users',
    fields: [
      { field: 'watermark', type: mediaFieldType.hostedMedia },
      { field: 'avatar', type: mediaFieldType.hostedMedia },
    ]
  },
  { 
    collection: 'orgs', 
    fields: [
      { field: 'logo', type: mediaFieldType.hostedMedia }
    ]
  },
  {
    collection: 'movies',
    fields: [
      { field: 'main.banner.media', type: mediaFieldType.hostedMedia }, // TODO issue #3291
      { field: 'main.poster.media', type: mediaFieldType.hostedMedia }, // TODO issue #3291
      { field: 'promotionalElements.still_photo', type: mediaFieldType.recordOfHostedMedia },
      { field: 'promotionalElements.presentation_deck', type: mediaFieldType.hostedMedia },
      { field: 'promotionalElements.scenario', type: mediaFieldType.hostedMedia },
    ]
  }
];

/**
 * Sync firestore to storage, taking storage as the source of truth
 */
export async function syncStorage() {

  let startedMaintenance = false;
  if (!await isInMaintenance()) {
    startedMaintenance = true;
    await startMaintenance();
  }

  console.log('//////////////');
  console.log('// Deleting all media references in firestore');
  console.log('//////////////');

  for (const ref of mediaReferences) {
    const docs = await getCollection<any>(ref.collection);
    const unlinkPromises = [];

    for (const doc of docs) {
      const docId = doc.id ? doc.id : doc.uid;
      const docRef = db.collection(ref.collection).doc(docId);
      
      for (const field of ref.fields) {

        let data = {};

        switch (field.type) {
          case mediaFieldType.hostedMedia:
            // single media
            data = createHostedMedia();
            break;
          case mediaFieldType.recordOfHostedMedia:
            // record of media
            const record = get(doc, field.field);
            for (const key in record) {
              data[key] = {};
              data[key].media = createHostedMedia(); // TODO issue #3291
            }
            break;
          default:
            throw new Error('Unknown field type for media reference');
        }

        const promise = docRef.update({[field.field]: data});
        unlinkPromises.push(promise);
      }
    }

    await Promise.all(unlinkPromises);

  }

  console.log('//////////////');
  console.log('// Recreating media references in firestore');
  console.log('//////////////');

  const { storage } = loadAdminServices();
  const bucket = storage.bucket(getStorageBucketName());
  const [files] = await bucket.getFiles();

  for (const file of files) {
    try {
      const { filePath, doc, docData, fieldToUpdate } = await getDocAndPath(file.name);

      if (!has(docData, fieldToUpdate)) {
        throw new Error(`Lost File: no media field available in db`);
      }

      const currentMediaValue = get(docData, fieldToUpdate);
      if (!!currentMediaValue.ref) {
        throw new Error(`Duplicate File: reference is already set by another file.`);
      } 
      
      const [ signedUrl ] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-3000',
        version: 'v2'
      });

      // link the firestore
      // ! this will not work with array in the path like for poster
      await doc.update({[fieldToUpdate]: { ref: filePath, url: signedUrl } });
    } catch (error) {
      console.log(`An error happened when syncing ${file.name}!`, error.message);
    }
  }

  if (startedMaintenance) await endMaintenance();

}

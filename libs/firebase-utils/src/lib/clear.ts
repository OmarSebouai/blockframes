import { firestore } from 'firebase-admin';

/**
 * Clear the DB
 */
export async function clearDB() {
  const db = firestore();

  // retrieve all the collections at the root.
  const collections = await db.listCollections();
  const promises: Promise<any>[] = [];
  for (const collection of collections) {
    const docs = await collection.listDocuments();
    for (const doc of docs) {
      promises.push(doc.delete());
    }
  }
  return Promise.all(promises);
};

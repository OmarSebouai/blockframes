import { firestore } from 'firebase-admin';


/**
 * Clear the DB
 */
export async function clearDB() {
  const db = firestore();
  
  const collections = ['users', 'orgs', 'movies', 'notifications', 'invitations', '_META'];
  const promises: Promise<any>[] = [];
  for (const collection of collections) {
    const docs = await db.collection(collection).get().then(c => c.docs);
    for (const doc of docs) {
      promises.push(doc.ref.delete());
    }
  }
  return Promise.all(promises);
};

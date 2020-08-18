import { clearFirestoreData, firestore, initializeTestApp } from '@firebase/testing';

describe('Clear DB', () => {
  let db: firestore.Firestore;
  beforeAll(async () => {
    const app = initializeTestApp({ projectId: 'test' });
    db = app.firestore();
  });
  beforeEach(async () => {
    await db.collection('users').add({});
  })
  afterEach(() => clearFirestoreData({ projectId: 'test' }));

  it('Should have data', async () => {
    try {
      const ref = await db.collection('users').get();
      expect(ref.docs.length).toEqual(1);
    } catch(err) {
      console.error(err);
    }
  });
})

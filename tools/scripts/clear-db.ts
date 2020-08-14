import { clearDB, initializeFirebase } from '../../libs/firebase-utils/src';
import { firebase } from '../../env/env';

// TODO:  TEST THIS BEFORE MAKING A PR
initializeFirebase(firebase, 'GOOGLE_APPLICATION_CREDENTIALS');

clearDB().then(() => process.exit(0));
export const production = true;
export const hmr = false;

// TODO issue#1146 AFM CODE
// is AFM disable ? -> false, it means that AFM is enabled = some piece of code will be skipped
export const AFM_DISABLE = false;

export const persistenceSettings = {
  // TODO(issue#846): change to synchronizeTabs when available (angularFire 5.2)
  experimentalTabSynchronization: true
};

// Firebase
// ========

export const appUrl = {
  content: 'https://demo4.archipelcontent.com',
  market: 'https://demo4.archipelmarket.com',
  crm: 'https://demo4.crm.blockframes.io',
}

export const firebase = {
  apiKey: 'AIzaSyB8Ch4AX-SsVbl76goSlkfS9FHh6FkT5MY',
  authDomain: 'blockframes-demo-4.firebaseapp.com',
  databaseURL: 'https://blockframes-demo-4.firebaseio.com',
  projectId: 'blockframes-demo-4',
  storageBucket: 'blockframes-demo-4.appspot.com',
  messagingSenderId: '549985951125'
};

// Algolia
// =======

export const algolia = {
  appId: '8E9YO1I9HB',
  searchKey: '4a2990a293c0ee0bfde9ebd66270a47f',
  indexNameOrganizations: 'demo4_orgs'
};

// Ethereum
// ========

export const network = 'goerli';
export const mnemonic = ''; // defined in functions.config, see backend-functions/environments
export const baseEnsDomain = 'blockframes.test';
export const factoryContract = 'factory2.eth';

// OMDB
// =======
export const omdbApiKey = '4d1be897';

// TODO(issue#847): change the address
export const contracts = {
  ipHash: '0x6f77765b18deac65dc55c3a38a112c9583e25185',
  testErc1077: '0x758011e12E57a81f93D1e59AdF8867463349A54d',
  ensResolver: '0xc1EA41786094D1fBE5aded033B5370d51F7a3F96'
};

export const relayer = {
  registryAddress: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
  resolverAddress: '0xc1EA41786094D1fBE5aded033B5370d51F7a3F96',
  network,
  baseEnsDomain,
  factoryContract
};

// Functions
// =========

export const backupBucket = 'demo4-backups';
export const sendgridAPIKey = null; // defined in functions.config, see backend-functions/environments

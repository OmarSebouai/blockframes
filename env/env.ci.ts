export const production = false;
export const hmr = false; // hot-reloading: use true for local dev

// TODO issue#1146 AFM CODE
// is AFM disable ? -> false, it means that AFM is enabled = some piece of code will be skipped
export const AFM_DISABLE = false;

export const persistenceSettings = {
  synchronizeTabs: true
};

// Analytics
// =========

export const sentryEnv = undefined;
export const sentryDsn = undefined;

// Firebase
// ========

export const appUrl = {
  content: 'https://blockframes-ci.web.app',
  market: 'http://blockframes-ci-festival.web.app',
  crm: 'https://blockframes-ci-crm.web.app',
}

export const firebase = {
  apiKey: 'AIzaSyATQHmR6iTCgaBkCXansUcA3pJma3jCgC0',
  authDomain: 'blockframes-ci.firebaseapp.com',
  databaseURL: 'https://blockframes-ci.firebaseio.com',
  projectId: 'blockframes-ci',
  storageBucket: 'blockframes-ci.appspot.com',
  messagingSenderId: '973979650792',
  appId: "1:973979650792:web:8b3ec4caab8dd5ef",
  measurementId: "G-GE7LPQ7MBX"
};

// Algolia
// =======

export const algolia = {
  appId: '8E9YO1I9HB',
  searchKey: '4a2990a293c0ee0bfde9ebd66270a47f',
  indexNameOrganizations: 'ci_orgs',
  indexNameMovies: 'ci_movies',
  indexNameUsers: 'ci_users',
};

// Ethereum
// ========

export const network = 'goerli';
export const mnemonic = '';
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

export const backupBucket = 'ci-backups-blockframes';
export const sendgridAPIKey = '';

// Sendgrid Emails
export const templateIds = {
  // Templates for the account creation flow
  user: {
    // Template for welcome message when user created his account by himself
    welcomeMessage: 'd-fc05a8cf5b1548ebae9ca44247a6c256',

    // Template for sending the verify email
    verifyEmail: 'd-81438bdf511b43cfa866ca63a45a02ae',
    resetPassword: 'd-6a0710945bc841ffb6955e3dc202704c',

    // Templates for informing new user that his account have been created
    credentials: {
      attendEvent: {
        catalog: 'd-ce3e57248a694cefacad49bc4c820078',
        festival: 'd-ce3e57248a694cefacad49bc4c820078',
      },
      joinOrganization: {
        catalog: 'd-a34ce9ea59c5477f9feae8f556157b6b',
        festival: 'd-f0c4f1b2582a4fc6ab12fcd2d7c02f5c',
      }
    },
  },
  // Templates for the org management flow
  org: {
    accepted: 'd-8c5f7009cd2f4f1b877fa168b4efde48',
    appAccessChanged: 'd-274b8b8370b44dc2984273d28970a06d',
    memberAdded: 'd-f84d8c5a70884316870ca4ef657e368f',
  },
  // Templates for requests (invitations)
  request: {
    joinOrganization: {
      created: 'd-b1ab5d21def145ccb759520e2d984436',
      pending: 'd-88665c2583dc46ea85588a39fa8ca1ee',
      accepted: 'd-d32b25a504874a708de6bfc50a1acba7',
    },
    attendEvent: {
      created: 'd-07f5e3cc6796455097b6082c22568d9e'
    }
  },
  // Templates for invitations
  invitation: {
    attendEvent: {
      created: 'd-1a7cc9ca846c4ae1b4e8cf8a76455cc5'
    }
  }
}

// Yandex Metrika Id
export const yandexId = 0;

// Intercom
// ========
export const intercomId = '';

// Quorum
// ========
export const quorum = {
  archipelNode: {
    url: 'https://e0rf4hbql8-e0cy67u40h-rpc.de0-aws.kaleido.io',
    user: 'e0xwcvgknw',
    privateFor: 'PJg4NoFMk73mGCbkJ7/griaiKfkbS+edhfjO5PzztQs=',
    ethAddress: '0x7E5D163D7390A6068d44C8e2F3c2861B5133daa4',
  },
  pulsarlNode: {
    url: 'https://e0rf4hbql8-e0zhtusyfh-rpc.de0-aws.kaleido.io',
    user: 'e0xwcvgknw',
    privateFor: 'fnF4IPKvDcmM9bgmEKHoYjNyXG6cXqJjv806RK1F5y8=',
    ethAddress: '0x43c92D51ba8c0B83062F8116B036D6616ebe4746',
  },
  bankNode: {
    url: 'https://e0rf4hbql8-e0jbt507aa-rpc.de0-aws.kaleido.io',
    user: 'e0xwcvgknw',
    privateFor: 'Tj879+7P6IgX2UJTOLtWx5IjrPlABb7HO//kNNbnt28=',
    ethAddress: '0xe795245444d459CD0d8e12A26232646B5521e72F',
  },
}

// BigQuery
// ========
export const bigQueryAnalyticsTable = 'blockframes-ci.analytics_197180636.events_';

// Archipel Content OrgId
// ======================
export const centralOrgID = "jnbHKBP5YLvRQGcyQ8In";

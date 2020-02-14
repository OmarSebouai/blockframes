import { loadAdminServices } from './admin';
import {
  storeSearchableMovie,
  storeSearchableOrg
} from '../../backend-functions/src/internals/algolia';
import { readJSONLinesFromSTDIN } from './users';
import { algolia } from '../../backend-functions/src/environments/environment';
import algoliasearch, { Index } from 'algoliasearch';

export async function upgradeAlgoliaOrgs() {
  const { db } = loadAdminServices();
  const orgs = await db.collection('orgs').get();

  const promises = [];
  orgs.forEach(org => {
    const { id, name } = org.data();
    promises.push(storeSearchableOrg(id, name, process.env['ALGOLIA_API_KEY']));
  });

  return Promise.all(promises);
}

export async function upgradeAlgoliaMovies() {
  const { db } = loadAdminServices();
  const movies = await db.collection('movies').get();

  const promises = [];
  movies.forEach(movie => {
    promises.push(storeSearchableMovie(movie.data(), process.env['ALGOLIA_API_KEY']));
  });
  return Promise.all(promises);
}

export async function uploadToAlgolia(index: string) {
  const lines = await readJSONLinesFromSTDIN();
  // We extract the content in the line, IF you pass a blockframes backup ({docPath: ..., content: ....})
  const trimmedLines = lines.map(x => (x.docPath ? x.content : x));
  const adminKey = process.env['ALGOLIA_API_KEY'];
  return Promise.all(
    trimmedLines.map(async line => {
      console.log('storing:', line);
      try {
        delete line.salesAgentDeal; // HEAVY
        await storeSomethingInAlgolia(adminKey, index, line);
      } catch (err) {
        console.error('error:', err);
      }
    })
  );
}

let client = null;
const indexes: { [keys: string]: Index } = {};

const indexBuilder = (adminKey: string, name: string) => {
  if (!client) {
    client = algoliasearch(algolia.appId, adminKey);
  }
  if (!indexes[name]) {
    indexes[name] = client.initIndex(name);
  }
  return indexes[name];
};

export function storeSomethingInAlgolia(adminKey: string, index: string, sthg: any): Promise<any> {
  return indexBuilder(adminKey, index).saveObject({ objectID: sthg.id, ...sthg });
}

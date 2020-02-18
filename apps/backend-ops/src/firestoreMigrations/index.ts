import * as v0001 from './0001';
import * as v0002 from './0002';
import * as v0003 from './0003';
import * as v0004 from './0004';
import * as v0005 from './0005';
import * as v0006 from './0006';
import * as v0007 from './0007';
import * as v0008 from './0008';
import * as v0009 from './0009';

import { Firestore } from '../admin';

export interface IMigration {
  upgrade: (db: Firestore) => Promise<any>;
}

export interface IMigrationWithVersion extends IMigration {
  version: number;
}

export const MIGRATIONS = {
  1: v0001,
  2: v0002,
  3: v0003,
  4: v0004,
  5: v0005,
  6: v0006,
  7: v0007,
  8: v0008,
  9: v0009
};

export const VERSIONS_NUMBERS = Object.keys(MIGRATIONS).map(s => parseInt(s, 10));

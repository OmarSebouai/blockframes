import { Injectable } from '@angular/core';
import { StateActiveGuard, FireQuery, Query } from '@blockframes/utils';
import { Organization, OrganizationStore } from '../+state';
import { Router } from '@angular/router';

export const orgActiveQuery = (orgId: string): Query<Organization> => ({
  path: `orgs/${orgId}`,
  members: org =>
    org.userIds.map(uid => ({
      path: `users/${uid}`
    }))
});

@Injectable({ providedIn: 'root' })
export class OrganizationActiveGuard extends StateActiveGuard<Organization> {
  readonly params = ['orgId'];
  readonly urlFallback: 'layout';

  constructor(private fireQuery: FireQuery, store: OrganizationStore, router: Router) {
    super(store, router);
  }

  query({ orgId }) {
    return this.fireQuery.fromQuery<Organization>(orgActiveQuery(orgId));
  }
}

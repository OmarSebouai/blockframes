import { Injectable } from '@angular/core';
import { UserRole, createDocPermissions, PermissionsDocument } from './permissions.firestore';
import { PermissionsState, PermissionsStore } from './permissions.store';
import { CollectionService, CollectionConfig, AtomicWrite } from 'akita-ng-fire';
import { firestore } from 'firebase/app';
import { OrganizationQuery } from '@blockframes/organization/+state/organization.query';
import { UserService } from '@blockframes/user/+state';

@Injectable({
  providedIn: 'root'
})
@CollectionConfig({ path: 'permissions' })
export class PermissionsService extends CollectionService<PermissionsState> {
  constructor(
    private organizationQuery: OrganizationQuery,
    private userService: UserService,
    store: PermissionsStore
  ) {
    super(store);
  }

  /**
   * Takes a document (movie or contract), create relative permissions
   * and add them to documentPermissions subcollection.
   * @param doc
   * @param write
   */
  public addDocumentPermissions(
    docId: string,
    write: AtomicWrite,
    organizationId: string = this.organizationQuery.getActiveId()
  ) {
    const documentPermissions = createDocPermissions({ id: docId, ownerId: organizationId });
    const documentPermissionsRef = this.db.doc(`permissions/${organizationId}/documentPermissions/${documentPermissions.id}`).ref;
    (write as firestore.WriteBatch).set(documentPermissionsRef, documentPermissions);
  }

  /** Ensures that there is always at least one super Admin in the organization. */
  public hasLastSuperAdmin(permissions: PermissionsDocument, uid: string, role: UserRole) {
    if (role !== 'superAdmin' && permissions.roles[uid] === 'superAdmin') {
      const superAdminNumber = Object.values(permissions.roles).filter(value => value === 'superAdmin').length;
      return superAdminNumber > 1 ? true : false;
    } else {
      return true;
    }
  }

  /** Update user role. */
  public async updateMemberRole(uid: string, role: UserRole): Promise<string> {
    const orgId = (await this.userService.getValue(uid)).orgId;
    const permissions = await this.getValue(orgId);
    if (permissions.roles[uid] === role) {
      return 'This user already has this role.';
    }
    try {
      if (!this.hasLastSuperAdmin(permissions, uid, role)) {
        throw new Error('There must be at least one Super Admin in the organization.');
      }
      /** Update role of a member of the organization */
      permissions.roles[uid] = role;
      await this.update(orgId, { roles: permissions.roles });
      return 'Role updated';
    } catch (error) {
      return error.message;
    }
  }
}

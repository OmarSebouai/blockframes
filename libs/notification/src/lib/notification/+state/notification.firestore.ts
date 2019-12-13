import { PublicOrganization } from '@blockframes/organization/types';
import { PublicMovie } from '@blockframes/movie/types';
import { firestore } from 'firebase/app';
import { PublicUser } from '@blockframes/auth/+state/auth.firestore';
import { App } from '@blockframes/utils/apps';

/** Type of Notification depending of its origin. */
export const enum NotificationType {
  newSignature = 'newSignature',
  finalSignature = 'finalSignature',
  createDocument = 'createDocument',
  deleteDocument = 'deleteDocument',
  updateDocument = 'updateDocument',
  inviteOrganization = 'inviteOrganization',
  removeOrganization = 'removeOrganization',
  pathToDocument = 'pathToDocument',
  organizationAcceptedByArchipelContent = 'organizationAcceptedByArchipelContent',
  movieTitleUpdated = 'movieTitleUpdated',
  movieTitleCreated = 'movieTitleCreated',
  movieDeleted = 'movieDeleted',
  invitationFromUserToJoinOrgDecline = 'invitationFromUserToJoinOrgDecline',
  invitationFromOrganizationToUserDecline = 'invitationFromOrganizationToUserDecline',
  memberAddedToOrg = 'memberAddedToOrg',
  memberRemovedFromOrg = 'memberRemovedFromOrg'
}

/** Minimum required informations to create a Notification. */
export interface NotificationOptions {
  userId: string;
  user?: Partial<PublicUser>;
  docId?: string;
  type: NotificationType;
  movie?: PublicMovie;
  organization?: PublicOrganization;
  app: App;
}

/** Generic informations for a Notification. */
export interface NotificationDocument extends NotificationOptions {
  id: string;
  isRead: boolean;
  date: firestore.FieldValue;
};

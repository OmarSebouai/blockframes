/** Gives information about an application */
import { AppDetails } from '@blockframes/utils';
import {
  OrganizationDocumentWithDates,
  WishlistDocumentWithDates,
  OrganizationDocument,
  WishlistDocument,
  createOrganizationRaw
} from './organization.firestore';
import { Movie } from '@blockframes/movie';
import { CatalogBasket } from '@blockframes/marketplace';
import { OrganizationMember } from '../member/+state/member.model';
import { firestore } from 'firebase/app';
export {
  OrganizationStatus,
  WishlistStatus,
  OrganizationDocument,
  createOrganizationDocument
} from './organization.firestore';

export const enum AppStatus {
  none = 'none', // no request nor accept.
  requested = 'requested',
  accepted = 'accepted'
}

export const PLACEHOLDER_LOGO = '/assets/logo/organisation_avatar_250.svg';

/** An application details with the organization authorizations */
export interface AppDetailsWithStatus extends AppDetails {
  status: AppStatus;
}

export interface OrganizationOperation {
  id: string;
  name: string;
  quorum: number;
  members: OrganizationMember[];
}

export interface OrganizationAction {
  id: string;
  opId: string;
  name: string;
  signers: OrganizationMember[];
  isApproved: boolean;
  approvalDate?: string;
}

export interface OrganizationWithTimestamps extends OrganizationDocument {
  operations?: OrganizationOperation[];
  actions?: OrganizationAction[];
  baskets: CatalogBasket[];
}

export interface Organization extends OrganizationDocumentWithDates {
  operations?: OrganizationOperation[];
  actions?: OrganizationAction[];
  baskets: CatalogBasket[];
  isDeploying?: boolean;
  deployStep?: DeploySteps;
}

export interface Wishlist extends WishlistDocumentWithDates {
  movies?: Movie[];
}

export interface OrganizationForm {
  name: string;
}

export const enum DeploySteps { notDeployed, registered, resolved, ready };

export interface PublicOrganization {
  id: string;
  name: string;
}

/** A factory function that creates an Organization. */
export function createOrganization(
  params: Partial<Organization> = {}
): Organization {
  const org = createOrganizationRaw(params) as Organization;

  return {
    ...org,
    // Here, "created" & "updated" fields are Date objects
    created: new Date(),
    updated: new Date(),
    // Init "akita" fields
    baskets: [],
    actions: [],
    operations: [],
  }
}

/**
 * Convert an Organization to an OrganizationDocument at each
 * creation or update of an organization
*/
export function convertToOrganizationDocument(organization: Organization): OrganizationDocument {
  delete organization.baskets;
  delete organization.actions;
  delete organization.operations;
  return {
    ...organization,
    created: firestore.Timestamp.fromDate(organization.created),
    updated: firestore.Timestamp.fromDate(new Date()),
    wishlist: convertWishlistDocumentWithDateToWishlistDocument(organization.wishlist)
  };
}

export function createOperation(
  operation: Partial<OrganizationOperation> = {}
): OrganizationOperation {
  return {
    quorum: 0,
    members: [],
    ...operation
  } as OrganizationOperation;
}

/** Convert an OrganizationWithTimestamps to an Organization (that uses Date). */
export function convertOrganizationWithTimestampsToOrganization(
  org: OrganizationWithTimestamps
): Organization {
  return {
    ...org,
    created: org.created.toDate(),
    updated: org.updated.toDate(),
    wishlist: convertWishlistDocumentToWishlistDocumentWithDate(org.wishlist)
  };
}

/** Convert a WishlistDocument to a WishlistDocumentWithDates (that uses Date). */
export function convertWishlistDocumentToWishlistDocumentWithDate(
  wishlist: WishlistDocument[]
): WishlistDocumentWithDates[] {
  if (!wishlist) {
    return [];
  }

  return wishlist.map(wish => {
    if (!!wish.sent) {
      return { ...wish, sent: wish.sent.toDate() };
    } else {
      return { ...wish, sent: null };
    }
  });
}

/** Convert a WishlistDocument to a WishlistDocumentWithDates (that uses Date). */
export function convertWishlistDocumentWithDateToWishlistDocument(
  wishlist: WishlistDocumentWithDates[]
): WishlistDocument[] {
  if (!wishlist) {
    return [];
  }

  return wishlist.map(wish => {
    if (!!wish.sent) {
      return { ...wish, sent: firestore.Timestamp.fromDate(wish.sent) };
    } else {
      return { ...wish, sent: null };
    }
  });
}

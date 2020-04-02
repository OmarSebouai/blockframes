import { firestore } from "firebase/app";
import { TermsRaw } from "@blockframes/utils/common-interfaces/terms";
import { Party } from "@blockframes/utils/common-interfaces/identity";
import { PriceRaw } from "@blockframes/utils/common-interfaces/price";
import {
  TerritoriesSlug,
  LanguagesSlug,
  SubLicensorRoleSlug
} from "@blockframes/utils/static-model/types";
import { ImgRef } from "@blockframes/utils/image-uploader";
import { PaymentScheduleRaw } from "@blockframes/utils/common-interfaces/schedule";

type Timestamp = firestore.Timestamp;

export const contractStatus = {
  accepted: 'Accepted',
  paid: 'Paid',
  unknown: 'Unknown',
  waitingsignature: 'Waiting for signature',
  waitingpayment: 'Waiting for payment',
  rejected: 'Rejected',
  aborted: 'Aborted',
  /**
   * @dev first status of a contract
   * Starting from this status, the contract is visible by creator only
   */
  draft: 'Draft',
  /**
   * @dev once the user hit the submit button, the contract is waiting for approvment
   * Starting from this status, the contract is visible by creator (but not editable anymore) and by admins
   */
  submitted: 'Submitted',
  /**
   * @dev when an admin checked a "submitted" contract and all seems good.
   * Starting from this status, contract is visible for every parties
   */
  undernegotiation: 'Under negotiation',
} as const;

export type ContractStatus = keyof typeof contractStatus;
export type ContractStatusValue = typeof contractStatus[ContractStatus];

/** @dev Valid values of ContractStatus */
export const ValidContractStatuses = ['waitingpayment', 'paid', 'accepted'];

export const contractType = {
  mandate: 'Mandate',
  sale: 'Sale'
} as const;

export type ContractType = keyof typeof contractType;
export type ContractTypeValue = typeof contractType[ContractType];

interface ContractTitleDetailRaw<D> {
  /**
   * @dev titleId is replacing movieId
   * since we are going to handle series, movies etc..
   */
  titleId: string,
  price: PriceRaw<D>,
  distributionDealIds: string[];
}

export interface ContractTitleDetail extends ContractTitleDetailRaw<Date> {
}

export interface ContractTitleDetailDocument extends ContractTitleDetailRaw<Timestamp> {
}

interface ContractPartyDetailRaw<D> {
  /**
   * @dev This represents a company (at least) and can be linked to an orgId.
   */
  party: Party,
  /**
   * @dev The signature date of the party for the last contract version
   */
  signDate?: D,
  /**
   * @dev The status of the party for the last contract version.
   * (ie: Accepted, Rejected)
   */
  status: ContractStatus,
  /**
   * Legal role(s) of this party for child contracts.
   * @dev Use this to set which role(s) this party will have for child contracts
   * For example, the licensor for a movie can have to approve sub-sells of the license for this movie.
   * A more explicit naming would have been: rolesForChildContracts
   */
  childRoles?: SubLicensorRoleSlug[],
}

/**
 * Subcollection of a contract document.
 * @dev Allows to handle multiple version of a contract
 */
interface ContractVersionRaw<D> {
  id: number,
  status: ContractStatus,
  scope: TermsRaw<D>,
  creationDate?: D,
  titles: Record<string, ContractTitleDetailRaw<D>>,
  price: PriceRaw<D>;
  /** @dev informations about payments dates */
  paymentSchedule?: PaymentScheduleRaw<D>[],
  /** @dev if paymentSchedule is empty, we use this string field */
  customPaymentSchedule?: string,
  /** @dev payment conditions */
  paymentTerm: TermsRaw<D>,
  renewalConditions?: string,
  terminationConditions?: string,
  /**
   * @dev this is a string field (for now) to determine which
   * kind of expenses can be attributed to this contract.
   * This will be used by admins when they ventilate expenses
   * into various contracts for generating financial reports.
   */
  authorizedRecoupableExpenses?: string;
}

interface ContractRaw<D> {
  id: string,
  /**
   * @dev To facilitate firebase queries:
   * Without ContratType :
   *   if we wanted to fetch "Archipel" contracts where partyIds array-contains 'orgId Archipel'
   *   and where the corresponding party role is "licensor", we could not do it in a single Firebase query because
   *   of the index limitations.
   * With ContracType :
   *   we can fetch contracts where partyIds array-contains 'orgId Archipel' and where ContractType = "mandate".
   */
  type: ContractType,
  /** @dev This array is automatically populated by backend functions */
  parentContractIds?: string[],
  /** @dev This array is automatically populated by backend functions */
  childContractIds?: string[],
  /** @dev An informative signature date, given that the actual signatures are in parties */
  signDate?: D,
  parties: ContractPartyDetailRaw<D>[],
  /** 
   * @dev Simply contains id of titles existing in lastVersion for querying purposes.
   * No need to edit it in front code, this will be overrided by backend functions.
  */
  titleIds: string[],
  /**
   * @dev simply contains id of org/parties existing in "parties"  for querying purposes.
   * No need to edit it in front code, this will be overrided by backend functions.
   */
  partyIds: string[],
  documents: ContractLegalDocuments,
  /**
   * @dev This params is handled by backend functions.
   * This will always contains the last version of the subcollection contractVersion.
   * If you edit something here, when saving data to DB, a function will 
   * take previous lastVersion content and put it into contractVersion for history purposes.
   * The new data will then replace the previous lastVersion.
   */
  lastVersion: ContractVersionRaw<D>
}
/**
 * @dev Public Contract document
 * This represents a contract merged with its last version.
 * We keep only the fields that are not critical and viewable by every logged in user
 */
interface PublicContractRaw {
  id: string,
  type: ContractType,
  titleIds: string[],
}

export interface ContractLegalDocuments {
  invoices: LegalDocument[],
  expenses?: LegalDocument[]
}

export interface LegalDocument {
  id: string,
  label: string,
  media: ImgRef,
  language?: LanguagesSlug,
  country?: TerritoriesSlug,
}

export interface ContractDocumentWithDates extends ContractRaw<Date> {
}

export interface ContractDocument extends ContractRaw<Timestamp> {
}

export interface ContractPartyDetailDocumentWithDates extends ContractPartyDetailRaw<Date> {
}

export interface ContractPartyDetailDocumentWithDatesDocument extends ContractPartyDetailRaw<Timestamp> {
}

export interface ContractVersionDocumentWithDates extends ContractVersionRaw<Date> {
}

export interface ContractVersionDocument extends ContractVersionRaw<Timestamp> {
}

export type PublicContractDocumentWithDates = PublicContractRaw;

export type PublicContractDocument = PublicContractRaw;

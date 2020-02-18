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

export enum ContractStatus {
  accepted = 'accepted',
  paid = 'paid',
  unknown = 'unknown',
  waitingsignature = 'waiting for signature',
  waitingpayment = 'waiting for payment',
  rejected = 'rejected',
  aborted = 'aborted',
  /** 
   * @dev first status of a contract 
   * Starting from this status, the contract is visible by creator only
   */
  draft = 'draft',
  /** 
   * @dev once the user hit the submit button, the contract is waiting for approvment 
   * Starting from this status, the contract is visible by creator (but not editable anymore) and by admins
   */
  submitted = 'submitted',
  /** 
   * @dev when an admin checked a "submitted" contract and all seems good.
   * Starting from this status, contract is visible for every parties
   */
  undernegotiation = 'under negotiation',
}

/** @dev Valid values of ContractStatus */
export const ValidContractStatuses = ['waitingpayment', 'paid', 'accepted'];

export enum ContractType {
  mandate = 'mandate',
  sale = 'sale'
}

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
  party: Party,
  signDate?: D,
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
  id: string,
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
   * @dev to facilitate firebase queries:
   * Without ContratType :
   *   if we wanted to fetch "Archipel" contracts where partyIds array-contains 'orgId Archipel'
   *   and where the corresponding party role is "licensor", we could not do it in a single Firebase query because
   *   of the index limitations.
   * With ContracType :
   *   we can fetch contracts where partyIds array-contains 'orgId Archipel' and where ContractType = "mandate".
   */
  type: ContractType,
  parentContractIds?: string[],
  childContractIds?: string[],
  /** @dev an informative signature date, given that the actual signatures are in parties */
  signDate?: D,
  parties: ContractPartyDetailRaw<D>[],
  titleIds: string[],
  partyIds: string[],
  documents: ContractLegalDocuments
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
import { getCodeIfExists } from '@blockframes/utils/static-model/staticModels';
import { createPrice } from '@blockframes/utils/common-interfaces/price';
import {
  ContractDocumentWithDates,
  ContractStatus,
  ContractTitleDetail,
  ContractPartyDetailDocumentWithDates,
  ContractPartyDetailDocumentWithDatesDocument,
  LegalDocument,
  LegalDocuments,
  ContractDocument
} from './contract.firestore';
import { createParty } from '@blockframes/utils/common-interfaces/identity';
import { createImgRef } from '@blockframes/utils/image-uploader';
import { createTerms } from '@blockframes/utils/common-interfaces/terms';
import { ContractVersion, ContractVersionWithTimeStamp, formatContractVersion } from '../../version/+state/contract-version.model';
import { firestore } from "firebase/app";

/**
 * @dev this should not be saved to firestore,
 * used only in front
 */
export interface ContractWithLastVersion {
  doc: Contract,
  last: ContractVersion,
}

export interface Contract extends ContractDocumentWithDates {
  versions?: ContractVersion[];
};

export interface ContractWithTimeStamp extends ContractDocument {
  versions?: ContractVersionWithTimeStamp[];
};

export type ContractPartyDetail = ContractPartyDetailDocumentWithDates;

export type ContractPartyDetailDocument = ContractPartyDetailDocumentWithDatesDocument;

/**
 * @dev this should not be saved to firestore,
 * used only in front
 */
export interface ContractWithLastVersion {
  doc: Contract;
  last: ContractVersion;
}

export function createContract(params: Partial<Contract> = {}): Contract {
  return {
    id: params.id ? params.id : '',
    parties: [],
    titleIds: [],
    partyIds: [],
    documents: createLegalDocuments(params.documents),
    ...params
  };
}

export function createContractVersion(params: Partial<ContractVersion> = {}): ContractVersion {
  return {
    id: params.id ? params.id : '1',
    titles: {},
    creationDate: new Date(),
    paymentSchedule: [],
    ...params,
    status: ContractStatus.submitted,
    scope: createTerms(params.scope),
    price: createPrice(params.price)
  };
}

export function createContractTitleDetail(
  params: Partial<ContractTitleDetail> = {}
): ContractTitleDetail {
  return {
    titleId: '',
    distributionDealIds: [],
    ...params,
    price: createPrice(params.price)
  };
}

export function createContractPartyDetail(
  params: Partial<ContractPartyDetail> = {}
): ContractPartyDetail {
  return {
    status: ContractStatus.unknown,
    childRoles: [],
    ...params,
    party: createParty(params.party),
  };
}

export function initContractWithVersion(): ContractWithLastVersion {
  return {
    doc: createContract(),
    last: createContractVersion()
  };
}

export function createPartyDetails(params: Partial<ContractPartyDetail>): ContractPartyDetail {
  return {
    status: params.status || ContractStatus.unknown,
    ...params,
    party: createParty(params.party),
  };
}

/**
 * Various validation steps for validating a contract
 * Currently (dec 2019), only validate that there is a licensee and a licensor
 * @param contract
 */
export function validateContract(contract: Contract): boolean {
  // First, contract must have at least a licensee and a licensor

  if (contract.parties.length < 2) {
    return false;
  }
  const licensees = contract.parties.filter(
    p => p.party.role === getCodeIfExists('LEGAL_ROLES', 'licensee')
  );
  const licensors = contract.parties.filter(
    p => p.party.role === getCodeIfExists('LEGAL_ROLES', 'licensor')
  );

  if (!licensees.length || !licensors.length) {
    return false;
  }

  for (const licensee of licensees) {
    if (licensee.party.orgId === undefined) {
      delete licensee.party.orgId;
    }
    if (typeof licensee.party.showName !== 'boolean') {
      return false;
    }
  }

  for (const licensor of licensors) {
    if (licensor.party.orgId === undefined) {
      delete licensor.party.orgId;
    }
    if (typeof licensor.party.showName !== 'boolean') {
      return false;
    }
  }

  // Other contract validation steps goes here
  // ...

  return true;
}

export function buildChainOfTitle() {
  // ie:  calculate contract prices and fees for each parents
  // @todo #1397 implement this
}

/** Function to convert a Contract into a ContractDocument. */
export function convertToContractDocument(params: Partial<Contract> = {}): ContractDocumentWithDates {
  return {
    id: params.id,
    parties: [],
    titleIds: [],
    partyIds: [],
    parentContractIds: [],
    childContractIds: [],
    documents: createLegalDocuments(params.documents),
    ...params
  };
}

export function createLegalDocuments(
  params: Partial<LegalDocuments> = {}
): LegalDocuments {
  return {
    chainOfTitles: [],
    invoices: [],
    ...params
  }
}

export function createLegalDocument(
  params: Partial<LegalDocument> = {}
): LegalDocument {
  return {
    id: '',
    label: '',
    ...params,
    media: createImgRef(params.media),
  }
}

export function creatContractFromFirestore(contract: ContractWithTimeStamp): Contract {
  return {
    ...contract,
    parties: contract.parties.map(partyDetails => formatPartyDetails(partyDetails)),
    versions: contract.versions.map(version => formatContractVersion(version))
  }
}

/**
 *
 * @param partyDetails
 */
export function formatPartyDetails(partyDetails: any): ContractPartyDetail {
  // Dates from firebase are Timestamps, we convert it to Dates.
  if (partyDetails.signDate instanceof firestore.Timestamp) {
    partyDetails.signDate = partyDetails.signDate.toDate();
  }

  return partyDetails as ContractPartyDetail;
}

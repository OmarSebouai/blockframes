'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">blockframes documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Queue.html" data-type="entity-link">Queue</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BaseTx.html" data-type="entity-link">BaseTx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credit.html" data-type="entity-link">Credit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeliveryContent.html" data-type="entity-link">DeliveryContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeliveryDocument.html" data-type="entity-link">DeliveryDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeliveryDocumentWithDates.html" data-type="entity-link">DeliveryDocumentWithDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeliveryRaw.html" data-type="entity-link">DeliveryRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeployParams.html" data-type="entity-link">DeployParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocWithID.html" data-type="entity-link">DocWithID</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailRequest.html" data-type="entity-link">EmailRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Invitation.html" data-type="entity-link">Invitation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationFromOrganizationToUser.html" data-type="entity-link">InvitationFromOrganizationToUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationFromUserToOrganization.html" data-type="entity-link">InvitationFromUserToOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationToWorkOnDocument.html" data-type="entity-link">InvitationToWorkOnDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialDocument.html" data-type="entity-link">MaterialDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialRaw.html" data-type="entity-link">MaterialRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialTemplateDocument.html" data-type="entity-link">MaterialTemplateDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaTx.html" data-type="entity-link">MetaTx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MGDeadlineRaw.html" data-type="entity-link">MGDeadlineRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieDocument.html" data-type="entity-link">MovieDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieDocumentWithDates.html" data-type="entity-link">MovieDocumentWithDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieFestivalPrizes.html" data-type="entity-link">MovieFestivalPrizes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieMain.html" data-type="entity-link">MovieMain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoviePromotionalDescription.html" data-type="entity-link">MoviePromotionalDescription</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MoviePromotionalElements.html" data-type="entity-link">MoviePromotionalElements</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieRaw.html" data-type="entity-link">MovieRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSaleDocumentWithDates.html" data-type="entity-link">MovieSaleDocumentWithDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSaleRaw.html" data-type="entity-link">MovieSaleRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSalesAgentDealDocumentWithDates.html" data-type="entity-link">MovieSalesAgentDealDocumentWithDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSalesAgentDealRaw.html" data-type="entity-link">MovieSalesAgentDealRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSalesCast.html" data-type="entity-link">MovieSalesCast</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSalesInfoDocumentWithDates.html" data-type="entity-link">MovieSalesInfoDocumentWithDates</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieSalesInfoRaw.html" data-type="entity-link">MovieSalesInfoRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieStory.html" data-type="entity-link">MovieStory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieVersionInfo.html" data-type="entity-link">MovieVersionInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationDocument.html" data-type="entity-link">NotificationDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationOptions.html" data-type="entity-link">NotificationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationDocPermissions.html" data-type="entity-link">OrganizationDocPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationDocument.html" data-type="entity-link">OrganizationDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationPermissions.html" data-type="entity-link">OrganizationPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrgProposal.html" data-type="entity-link">OrgProposal</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Prize.html" data-type="entity-link">Prize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PromotionalElement.html" data-type="entity-link">PromotionalElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PublicMovie.html" data-type="entity-link">PublicMovie</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PublicOrganization.html" data-type="entity-link">PublicOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PublicUser.html" data-type="entity-link">PublicUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterParams.html" data-type="entity-link">RegisterParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Relayer.html" data-type="entity-link">Relayer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RelayerConfig.html" data-type="entity-link">RelayerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestTokensParams.html" data-type="entity-link">RequestTokensParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendParams.html" data-type="entity-link">SendParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignDeliveryParams.html" data-type="entity-link">SignDeliveryParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignedMetaTx.html" data-type="entity-link">SignedMetaTx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnapObject.html" data-type="entity-link">SnapObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StakeholderDocument.html" data-type="entity-link">StakeholderDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepDocument.html" data-type="entity-link">StepDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepDocumentWithDate.html" data-type="entity-link">StepDocumentWithDate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StepRaw.html" data-type="entity-link">StepRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StoredDocument.html" data-type="entity-link">StoredDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link">Template</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TemplateDocument.html" data-type="entity-link">TemplateDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Title.html" data-type="entity-link">Title</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDocPermissions.html" data-type="entity-link">UserDocPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProposal.html" data-type="entity-link">UserProposal</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
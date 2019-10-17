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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountModule.html" data-type="entity-link">AccountModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ActionsListModule.html" data-type="entity-link">ActionsListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActionsListModule-7d2c10187a3cbb6ed36db128fe7b64ff"' : 'data-target="#xs-components-links-module-ActionsListModule-7d2c10187a3cbb6ed36db128fe7b64ff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionsListModule-7d2c10187a3cbb6ed36db128fe7b64ff"' :
                                            'id="xs-components-links-module-ActionsListModule-7d2c10187a3cbb6ed36db128fe7b64ff"' }>
                                            <li class="link">
                                                <a href="components/ActionsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActionsPickerListModule.html" data-type="entity-link">ActionsPickerListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActionsPickerListModule-ad449a0586b6b044e1569153cff4504f"' : 'data-target="#xs-components-links-module-ActionsPickerListModule-ad449a0586b6b044e1569153cff4504f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionsPickerListModule-ad449a0586b6b044e1569153cff4504f"' :
                                            'id="xs-components-links-module-ActionsPickerListModule-ad449a0586b6b044e1569153cff4504f"' }>
                                            <li class="link">
                                                <a href="components/ActionsPickerListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionsPickerListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActionsPickerModule.html" data-type="entity-link">ActionsPickerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActionsPickerModule-2b42b647592a0f1bb2a475c04994d4fa"' : 'data-target="#xs-components-links-module-ActionsPickerModule-2b42b647592a0f1bb2a475c04994d4fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActionsPickerModule-2b42b647592a0f1bb2a475c04994d4fa"' :
                                            'id="xs-components-links-module-ActionsPickerModule-2b42b647592a0f1bb2a475c04994d4fa"' }>
                                            <li class="link">
                                                <a href="components/ActionsPickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionsPickerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-693e8f26a57fa532fa5695c6d0d9cad1"' : 'data-target="#xs-components-links-module-AppModule-693e8f26a57fa532fa5695c6d0d9cad1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-693e8f26a57fa532fa5695c6d0d9cad1"' :
                                            'id="xs-components-links-module-AppModule-693e8f26a57fa532fa5695c6d0d9cad1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-8a63f0a4b3c881f29b2d1ab2946aeb8d"' : 'data-target="#xs-components-links-module-AuthModule-8a63f0a4b3c881f29b2d1ab2946aeb8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-8a63f0a4b3c881f29b2d1ab2946aeb8d"' :
                                            'id="xs-components-links-module-AuthModule-8a63f0a4b3c881f29b2d1ab2946aeb8d"' }>
                                            <li class="link">
                                                <a href="components/EmailVerifyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailVerifyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IdentityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IdentityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IdentityFeedbackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IdentityFeedbackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SigninFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SigninFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WelcomeViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WelcomeViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AvatarListModule.html" data-type="entity-link">AvatarListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AvatarListModule-9cc97c9609bc91dc329de6e9cfc5f1ec"' : 'data-target="#xs-components-links-module-AvatarListModule-9cc97c9609bc91dc329de6e9cfc5f1ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AvatarListModule-9cc97c9609bc91dc329de6e9cfc5f1ec"' :
                                            'id="xs-components-links-module-AvatarListModule-9cc97c9609bc91dc329de6e9cfc5f1ec"' }>
                                            <li class="link">
                                                <a href="components/AvatarListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AvatarListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatalogModule.html" data-type="entity-link">CatalogModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmModule.html" data-type="entity-link">ConfirmModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfirmModule-ada1c58194631a390794d44ca9f6fe60"' : 'data-target="#xs-components-links-module-ConfirmModule-ada1c58194631a390794d44ca9f6fe60"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmModule-ada1c58194631a390794d44ca9f6fe60"' :
                                            'id="xs-components-links-module-ConfirmModule-ada1c58194631a390794d44ca9f6fe60"' }>
                                            <li class="link">
                                                <a href="components/ConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardHomeModule.html" data-type="entity-link">DashboardHomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardHomeModule-45799074d87073ca523f1d730700e5c1"' : 'data-target="#xs-components-links-module-DashboardHomeModule-45799074d87073ca523f1d730700e5c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardHomeModule-45799074d87073ca523f1d730700e5c1"' :
                                            'id="xs-components-links-module-DashboardHomeModule-45799074d87073ca523f1d730700e5c1"' }>
                                            <li class="link">
                                                <a href="components/CatalogDashboardHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CatalogDashboardHomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatepickerModule.html" data-type="entity-link">DatepickerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DatepickerModule-b23c201c2b88242b5c3fc9145eebf5cf"' : 'data-target="#xs-components-links-module-DatepickerModule-b23c201c2b88242b5c3fc9145eebf5cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DatepickerModule-b23c201c2b88242b5c3fc9145eebf5cf"' :
                                            'id="xs-components-links-module-DatepickerModule-b23c201c2b88242b5c3fc9145eebf5cf"' }>
                                            <li class="link">
                                                <a href="components/DatepickerRangeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DatepickerRangeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryModule.html" data-type="entity-link">DeliveryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DeliveryModule-d3056ce4db1632e3f7352ed5c5344bb3"' : 'data-target="#xs-components-links-module-DeliveryModule-d3056ce4db1632e3f7352ed5c5344bb3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeliveryModule-d3056ce4db1632e3f7352ed5c5344bb3"' :
                                            'id="xs-components-links-module-DeliveryModule-d3056ce4db1632e3f7352ed5c5344bb3"' }>
                                            <li class="link">
                                                <a href="components/DeliveryActionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryActionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryAddChooseStarterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryAddChooseStarterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryAddFindMovieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryAddFindMovieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryAddSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryAddSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryAddSpecificDeliveryListPickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryAddSpecificDeliveryListPickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryAddTemplatePickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryAddTemplatePickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsDatesDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsDatesDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsDatesFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsDatesFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsDeadlinesFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsDeadlinesFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsDeadlinesRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsDeadlinesRepertoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsStakeholdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsStakeholdersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsStepsFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsStepsFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryInformationsStepsRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryInformationsStepsRepertoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryMaterialFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryMaterialFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryMaterialListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryMaterialListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryRepertoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryStakeholdersEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryStakeholdersEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryStakeholdersRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryStakeholdersRepertoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeliveryStatusesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeliveryStatusesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieMaterialFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieMaterialFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieMaterialListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieMaterialListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewTemplateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewTemplateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryRoutingModule.html" data-type="entity-link">DeliveryRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EditableModule.html" data-type="entity-link">EditableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' : 'data-target="#xs-components-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' :
                                            'id="xs-components-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' }>
                                            <li class="link">
                                                <a href="components/EditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' : 'data-target="#xs-directives-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' :
                                        'id="xs-directives-links-module-EditableModule-2cc4b00ab16d7ebcd982cc08cb4ad5d8"' }>
                                        <li class="link">
                                            <a href="directives/EditModeDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditModeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ViewModeDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewModeDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EditableSidenavModule.html" data-type="entity-link">EditableSidenavModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EditableSidenavModule-923318c777382dbe5a2c328845aeaec6"' : 'data-target="#xs-components-links-module-EditableSidenavModule-923318c777382dbe5a2c328845aeaec6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EditableSidenavModule-923318c777382dbe5a2c328845aeaec6"' :
                                            'id="xs-components-links-module-EditableSidenavModule-923318c777382dbe5a2c328845aeaec6"' }>
                                            <li class="link">
                                                <a href="components/EditableSidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditableSidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorNotFoundModule.html" data-type="entity-link">ErrorNotFoundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ErrorNotFoundModule-8e07bf2010bdb27f59354b719e70637c"' : 'data-target="#xs-components-links-module-ErrorNotFoundModule-8e07bf2010bdb27f59354b719e70637c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorNotFoundModule-8e07bf2010bdb27f59354b719e70637c"' :
                                            'id="xs-components-links-module-ErrorNotFoundModule-8e07bf2010bdb27f59354b719e70637c"' }>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeedbackMessageModule.html" data-type="entity-link">FeedbackMessageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FeedbackMessageModule-56f979b4e97f97e022cc37f0ff72c958"' : 'data-target="#xs-components-links-module-FeedbackMessageModule-56f979b4e97f97e022cc37f0ff72c958"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FeedbackMessageModule-56f979b4e97f97e022cc37f0ff72c958"' :
                                            'id="xs-components-links-module-FeedbackMessageModule-56f979b4e97f97e022cc37f0ff72c958"' }>
                                            <li class="link">
                                                <a href="components/FeedbackMessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeedbackMessageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ImportMovieModule.html" data-type="entity-link">ImportMovieModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ImportMovieModule-1a11cfee1fdc7d8826e9a0be5add3aa2"' : 'data-target="#xs-components-links-module-ImportMovieModule-1a11cfee1fdc7d8826e9a0be5add3aa2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ImportMovieModule-1a11cfee1fdc7d8826e9a0be5add3aa2"' :
                                            'id="xs-components-links-module-ImportMovieModule-1a11cfee1fdc7d8826e9a0be5add3aa2"' }>
                                            <li class="link">
                                                <a href="components/ImportSpreadsheetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImportSpreadsheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImportStepperComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImportStepperComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewMovieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreviewMovieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PreviewSheetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PreviewSheetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableExtractedMoviesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableExtractedMoviesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableExtractedSalesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableExtractedSalesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewExtractedElementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewExtractedElementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewImportErrorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewImportErrorsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InvitationModule.html" data-type="entity-link">InvitationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InvitationModule-625f38fd902c42a2de0656b19ba06d2f"' : 'data-target="#xs-components-links-module-InvitationModule-625f38fd902c42a2de0656b19ba06d2f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InvitationModule-625f38fd902c42a2de0656b19ba06d2f"' :
                                            'id="xs-components-links-module-InvitationModule-625f38fd902c42a2de0656b19ba06d2f"' }>
                                            <li class="link">
                                                <a href="components/InvitationItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvitationItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvitationListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvitationListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IpModule.html" data-type="entity-link">IpModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IpModule-8895affc573ed55d80c037ba322f0c43"' : 'data-target="#xs-components-links-module-IpModule-8895affc573ed55d80c037ba322f0c43"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IpModule-8895affc573ed55d80c037ba322f0c43"' :
                                            'id="xs-components-links-module-IpModule-8895affc573ed55d80c037ba322f0c43"' }>
                                            <li class="link">
                                                <a href="components/AddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExplorerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExplorerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/KeyManagerModule.html" data-type="entity-link">KeyManagerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-KeyManagerModule-ef628720c3c699daf32598a24b7465cf"' : 'data-target="#xs-components-links-module-KeyManagerModule-ef628720c3c699daf32598a24b7465cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-KeyManagerModule-ef628720c3c699daf32598a24b7465cf"' :
                                            'id="xs-components-links-module-KeyManagerModule-ef628720c3c699daf32598a24b7465cf"' }>
                                            <li class="link">
                                                <a href="components/KeyManagerItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeyManagerItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KeyManagerListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KeyManagerListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MonthCalendarModule.html" data-type="entity-link">MonthCalendarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MonthCalendarModule-d0220fef42e92542f146771050a5438a"' : 'data-target="#xs-components-links-module-MonthCalendarModule-d0220fef42e92542f146771050a5438a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MonthCalendarModule-d0220fef42e92542f146771050a5438a"' :
                                            'id="xs-components-links-module-MonthCalendarModule-d0220fef42e92542f146771050a5438a"' }>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieCardModule.html" data-type="entity-link">MovieCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieCardModule-46b6bc79c56123738de1538f3c6c58f9"' : 'data-target="#xs-components-links-module-MovieCardModule-46b6bc79c56123738de1538f3c6c58f9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieCardModule-46b6bc79c56123738de1538f3c6c58f9"' :
                                            'id="xs-components-links-module-MovieCardModule-46b6bc79c56123738de1538f3c6c58f9"' }>
                                            <li class="link">
                                                <a href="components/MovieCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayAssetsModule.html" data-type="entity-link">MovieDisplayAssetsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayAssetsModule-98b08900179972b68693a7a1305c526e"' : 'data-target="#xs-components-links-module-MovieDisplayAssetsModule-98b08900179972b68693a7a1305c526e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayAssetsModule-98b08900179972b68693a7a1305c526e"' :
                                            'id="xs-components-links-module-MovieDisplayAssetsModule-98b08900179972b68693a7a1305c526e"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayAssetsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayAssetsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayAvailabilitiesModule.html" data-type="entity-link">MovieDisplayAvailabilitiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayAvailabilitiesModule-276cdef117b480978b3f3feb6f28a7d1"' : 'data-target="#xs-components-links-module-MovieDisplayAvailabilitiesModule-276cdef117b480978b3f3feb6f28a7d1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayAvailabilitiesModule-276cdef117b480978b3f3feb6f28a7d1"' :
                                            'id="xs-components-links-module-MovieDisplayAvailabilitiesModule-276cdef117b480978b3f3feb6f28a7d1"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayAvailabilitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayAvailabilitiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayFilmDetailsModule.html" data-type="entity-link">MovieDisplayFilmDetailsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayFilmDetailsModule-d8bcdc691bd0a03d3ec7a05ca5a48764"' : 'data-target="#xs-components-links-module-MovieDisplayFilmDetailsModule-d8bcdc691bd0a03d3ec7a05ca5a48764"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayFilmDetailsModule-d8bcdc691bd0a03d3ec7a05ca5a48764"' :
                                            'id="xs-components-links-module-MovieDisplayFilmDetailsModule-d8bcdc691bd0a03d3ec7a05ca5a48764"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayFilmDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayFilmDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayKeywordsModule.html" data-type="entity-link">MovieDisplayKeywordsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayKeywordsModule-38516881f6f960cc02c45ab757aa51f8"' : 'data-target="#xs-components-links-module-MovieDisplayKeywordsModule-38516881f6f960cc02c45ab757aa51f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayKeywordsModule-38516881f6f960cc02c45ab757aa51f8"' :
                                            'id="xs-components-links-module-MovieDisplayKeywordsModule-38516881f6f960cc02c45ab757aa51f8"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayKeywordsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayKeywordsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayListModule.html" data-type="entity-link">MovieDisplayListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayListModule-3f9e9f9c6611d71ec1432b0dda2e61bc"' : 'data-target="#xs-components-links-module-MovieDisplayListModule-3f9e9f9c6611d71ec1432b0dda2e61bc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayListModule-3f9e9f9c6611d71ec1432b0dda2e61bc"' :
                                            'id="xs-components-links-module-MovieDisplayListModule-3f9e9f9c6611d71ec1432b0dda2e61bc"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayModule.html" data-type="entity-link">MovieDisplayModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayModule-d40a056bd6b8ba984fc1db4c9a0a53a3"' : 'data-target="#xs-components-links-module-MovieDisplayModule-d40a056bd6b8ba984fc1db4c9a0a53a3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayModule-d40a056bd6b8ba984fc1db4c9a0a53a3"' :
                                            'id="xs-components-links-module-MovieDisplayModule-d40a056bd6b8ba984fc1db4c9a0a53a3"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplayFestivalPrizesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayFestivalPrizesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplayMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplayPromotionalDescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayPromotionalDescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplayPromotionalElementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayPromotionalElementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplaySalesAgentDealComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplaySalesAgentDealComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplaySalesCastComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplaySalesCastComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplaySalesInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplaySalesInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieDisplayStoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayStoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayPrincipalInformationsModule.html" data-type="entity-link">MovieDisplayPrincipalInformationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayPrincipalInformationsModule-a356f994d533b868602581c697c19ce3"' : 'data-target="#xs-components-links-module-MovieDisplayPrincipalInformationsModule-a356f994d533b868602581c697c19ce3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayPrincipalInformationsModule-a356f994d533b868602581c697c19ce3"' :
                                            'id="xs-components-links-module-MovieDisplayPrincipalInformationsModule-a356f994d533b868602581c697c19ce3"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayPrincipalInformationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayPrincipalInformationsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayPrizesModule.html" data-type="entity-link">MovieDisplayPrizesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayPrizesModule-8443fe4353332286a0c79704ce2462d6"' : 'data-target="#xs-components-links-module-MovieDisplayPrizesModule-8443fe4353332286a0c79704ce2462d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayPrizesModule-8443fe4353332286a0c79704ce2462d6"' :
                                            'id="xs-components-links-module-MovieDisplayPrizesModule-8443fe4353332286a0c79704ce2462d6"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayPrizesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayPrizesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayProductionModule.html" data-type="entity-link">MovieDisplayProductionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayProductionModule-8ba78f62dd6788b3a18f0a80f2c8c5f7"' : 'data-target="#xs-components-links-module-MovieDisplayProductionModule-8ba78f62dd6788b3a18f0a80f2c8c5f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayProductionModule-8ba78f62dd6788b3a18f0a80f2c8c5f7"' :
                                            'id="xs-components-links-module-MovieDisplayProductionModule-8ba78f62dd6788b3a18f0a80f2c8c5f7"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayProductionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayProductionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplaySynopsisModule.html" data-type="entity-link">MovieDisplaySynopsisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplaySynopsisModule-2f2c2c7022fcca536cc2cf5a90162661"' : 'data-target="#xs-components-links-module-MovieDisplaySynopsisModule-2f2c2c7022fcca536cc2cf5a90162661"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplaySynopsisModule-2f2c2c7022fcca536cc2cf5a90162661"' :
                                            'id="xs-components-links-module-MovieDisplaySynopsisModule-2f2c2c7022fcca536cc2cf5a90162661"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplaySynopsisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplaySynopsisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieDisplayVersionInfoModule.html" data-type="entity-link">MovieDisplayVersionInfoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieDisplayVersionInfoModule-0be5b85e945a8d4b4290b51e67a50f0a"' : 'data-target="#xs-components-links-module-MovieDisplayVersionInfoModule-0be5b85e945a8d4b4290b51e67a50f0a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieDisplayVersionInfoModule-0be5b85e945a8d4b4290b51e67a50f0a"' :
                                            'id="xs-components-links-module-MovieDisplayVersionInfoModule-0be5b85e945a8d4b4290b51e67a50f0a"' }>
                                            <li class="link">
                                                <a href="components/MovieDisplayVersionInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieDisplayVersionInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieFormModule.html" data-type="entity-link">MovieFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieFormModule-d41378cee267df4de29d279ba38a21f4"' : 'data-target="#xs-components-links-module-MovieFormModule-d41378cee267df4de29d279ba38a21f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieFormModule-d41378cee267df4de29d279ba38a21f4"' :
                                            'id="xs-components-links-module-MovieFormModule-d41378cee267df4de29d279ba38a21f4"' }>
                                            <li class="link">
                                                <a href="components/MovieFormFestivalPrizesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormFestivalPrizesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormPromotionalDescriptionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormPromotionalDescriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormPromotionalElementsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormPromotionalElementsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormRootComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormRootComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormSalesAgentDealComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormSalesAgentDealComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormSalesCastComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormSalesCastComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormSalesInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormSalesInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormStoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormStoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieFormVersionInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieFormVersionInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieImdbSearchModule.html" data-type="entity-link">MovieImdbSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieImdbSearchModule-5782a3166df4caed82b1f775a66a02b3"' : 'data-target="#xs-components-links-module-MovieImdbSearchModule-5782a3166df4caed82b1f775a66a02b3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieImdbSearchModule-5782a3166df4caed82b1f775a66a02b3"' :
                                            'id="xs-components-links-module-MovieImdbSearchModule-5782a3166df4caed82b1f775a66a02b3"' }>
                                            <li class="link">
                                                <a href="components/MovieImdbSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieImdbSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieModule.html" data-type="entity-link">MovieModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieModule-023557a816fffebd08a38e5ae47680a0"' : 'data-target="#xs-components-links-module-MovieModule-023557a816fffebd08a38e5ae47680a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieModule-023557a816fffebd08a38e5ae47680a0"' :
                                            'id="xs-components-links-module-MovieModule-023557a816fffebd08a38e5ae47680a0"' }>
                                            <li class="link">
                                                <a href="components/HomeEmptyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeEmptyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieEmptyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieEmptyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MoviePickerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MoviePickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieTitleFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieTitleFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MovieViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MovieViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieRoutingModule.html" data-type="entity-link">MovieRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NoOrganizationModule.html" data-type="entity-link">NoOrganizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NoOrganizationModule-7641d5fa186f3afca64d70c74868bdd3"' : 'data-target="#xs-components-links-module-NoOrganizationModule-7641d5fa186f3afca64d70c74868bdd3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NoOrganizationModule-7641d5fa186f3afca64d70c74868bdd3"' :
                                            'id="xs-components-links-module-NoOrganizationModule-7641d5fa186f3afca64d70c74868bdd3"' }>
                                            <li class="link">
                                                <a href="components/OrganizationCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationFeedbackComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationFeedbackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationFindComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationFindComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationHomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link">NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotificationModule-8bbef46b2d1142307a887de4cfa98645"' : 'data-target="#xs-components-links-module-NotificationModule-8bbef46b2d1142307a887de4cfa98645"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationModule-8bbef46b2d1142307a887de4cfa98645"' :
                                            'id="xs-components-links-module-NotificationModule-8bbef46b2d1142307a887de4cfa98645"' }>
                                            <li class="link">
                                                <a href="components/NotificationItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationWidgetModule.html" data-type="entity-link">NotificationWidgetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotificationWidgetModule-3bff64d61786c0d6836bad62b6fd6bc1"' : 'data-target="#xs-components-links-module-NotificationWidgetModule-3bff64d61786c0d6836bad62b6fd6bc1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotificationWidgetModule-3bff64d61786c0d6836bad62b6fd6bc1"' :
                                            'id="xs-components-links-module-NotificationWidgetModule-3bff64d61786c0d6836bad62b6fd6bc1"' }>
                                            <li class="link">
                                                <a href="components/NotificationWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizationModule.html" data-type="entity-link">OrganizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrganizationModule-12aa0f0d3a44c6bb11c55241068e3acb"' : 'data-target="#xs-components-links-module-OrganizationModule-12aa0f0d3a44c6bb11c55241068e3acb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganizationModule-12aa0f0d3a44c6bb11c55241068e3acb"' :
                                            'id="xs-components-links-module-OrganizationModule-12aa0f0d3a44c6bb11c55241068e3acb"' }>
                                            <li class="link">
                                                <a href="components/MemberAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberFormRoleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberFormRoleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberInvitationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberInvitationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberPendingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberPendingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MemberRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MemberRepertoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationActivityViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationActivityViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationAdminViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationAdminViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationDisplayActionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationDisplayActionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationDisplayOperationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationDisplayOperationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationFormOperationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationFormOperationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationSignerFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationSignerFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationSignerRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationSignerRepertoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganizationWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrganizationWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-6b1d0d841204a9b4f88b068446613018"' : 'data-target="#xs-components-links-module-ProfileModule-6b1d0d841204a9b4f88b068446613018"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-6b1d0d841204a9b4f88b068446613018"' :
                                            'id="xs-components-links-module-ProfileModule-6b1d0d841204a9b4f88b068446613018"' }>
                                            <li class="link">
                                                <a href="components/PasswordFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PasswordFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDeleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileDeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplateModule.html" data-type="entity-link">TemplateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TemplateModule-8c0f2c54979211df2dc8433b5128b853"' : 'data-target="#xs-components-links-module-TemplateModule-8c0f2c54979211df2dc8433b5128b853"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplateModule-8c0f2c54979211df2dc8433b5128b853"' :
                                            'id="xs-components-links-module-TemplateModule-8c0f2c54979211df2dc8433b5128b853"' }>
                                            <li class="link">
                                                <a href="components/TemplateAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplateCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplateEditableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateEditableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplateListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplateMaterialFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateMaterialFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplateMaterialListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateMaterialListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemplateRepertoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemplateRepertoryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolbarModule.html" data-type="entity-link">ToolbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ToolbarModule-b8a61af2bede7d35506cd724009bd5d6"' : 'data-target="#xs-components-links-module-ToolbarModule-b8a61af2bede7d35506cd724009bd5d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarModule-b8a61af2bede7d35506cd724009bd5d6"' :
                                            'id="xs-components-links-module-ToolbarModule-b8a61af2bede7d35506cd724009bd5d6"' }>
                                            <li class="link">
                                                <a href="components/ContextMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContextMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeftMenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeftMenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TranslateSlugModule.html" data-type="entity-link">TranslateSlugModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TranslateSlugModule-5faba4f2b0225ea741afb532e4402897"' : 'data-target="#xs-pipes-links-module-TranslateSlugModule-5faba4f2b0225ea741afb532e4402897"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TranslateSlugModule-5faba4f2b0225ea741afb532e4402897"' :
                                            'id="xs-pipes-links-module-TranslateSlugModule-5faba4f2b0225ea741afb532e4402897"' }>
                                            <li class="link">
                                                <a href="pipes/TranslateSlugPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TranslateSlugPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiFormModule.html" data-type="entity-link">UiFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiFormModule-f05323271e0f55fc0f102fe19c3f9343"' : 'data-target="#xs-components-links-module-UiFormModule-f05323271e0f55fc0f102fe19c3f9343"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiFormModule-f05323271e0f55fc0f102fe19c3f9343"' :
                                            'id="xs-components-links-module-UiFormModule-f05323271e0f55fc0f102fe19c3f9343"' }>
                                            <li class="link">
                                                <a href="components/ChipsAutocompleteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChipsAutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PasswordConfirmComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link">UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' : 'data-target="#xs-components-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' :
                                            'id="xs-components-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' }>
                                            <li class="link">
                                                <a href="components/ButtonUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FileUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileUploadComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' : 'data-target="#xs-directives-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' :
                                        'id="xs-directives-links-module-UploadModule-5a2fb81d6e7f2d50848766e8aa67604b"' }>
                                        <li class="link">
                                            <a href="directives/DropZoneDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropZoneDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilsModule.html" data-type="entity-link">UtilsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WalletModule.html" data-type="entity-link">WalletModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WalletModule-93ee7703dfce7adffa22f78d84ae4244"' : 'data-target="#xs-components-links-module-WalletModule-93ee7703dfce7adffa22f78d84ae4244"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WalletModule-93ee7703dfce7adffa22f78d84ae4244"' :
                                            'id="xs-components-links-module-WalletModule-93ee7703dfce7adffa22f78d84ae4244"' }>
                                            <li class="link">
                                                <a href="components/WalletAddKeyTunnelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletAddKeyTunnelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletAddressViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletAddressViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletAskPasswordFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletAskPasswordFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletBlockieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletBlockieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletCreatePasswordFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletCreatePasswordFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletImportKeyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletImportKeyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletImportKeyFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletImportKeyFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletNoKeyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletNoKeyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletRevealMnemonicComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletRevealMnemonicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletSendTxTunnelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletSendTxTunnelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletWidgetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/MovieDisplayCardItemComponent.html" data-type="entity-link">MovieDisplayCardItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MovieDisplayVersionInfoComponent-1.html" data-type="entity-link">MovieDisplayVersionInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MovieEditableComponent-1.html" data-type="entity-link">MovieEditableComponent</a>
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
                                <a href="classes/ConfirmPasswordForm.html" data-type="entity-link">ConfirmPasswordForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ControlErrorStateMatcher.html" data-type="entity-link">ControlErrorStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTx.html" data-type="entity-link">CreateTx</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreditForm.html" data-type="entity-link">CreditForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/DirectorForm.html" data-type="entity-link">DirectorForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormBatch.html" data-type="entity-link">FormBatch</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormEntity.html" data-type="entity-link">FormEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormList.html" data-type="entity-link">FormList</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImdbError.html" data-type="entity-link">ImdbError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImdbMovie.html" data-type="entity-link">ImdbMovie</a>
                            </li>
                            <li class="link">
                                <a href="classes/InternationalPremiereForm.html" data-type="entity-link">InternationalPremiereForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvitationQuery.html" data-type="entity-link">InvitationQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvitationStore.html" data-type="entity-link">InvitationStore</a>
                            </li>
                            <li class="link">
                                <a href="classes/IpHashContractReadOnly.html" data-type="entity-link">IpHashContractReadOnly</a>
                            </li>
                            <li class="link">
                                <a href="classes/MaterialForm.html" data-type="entity-link">MaterialForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MaterialForm-1.html" data-type="entity-link">MaterialForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieCreditForm.html" data-type="entity-link">MovieCreditForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieFestivalPrizesForm.html" data-type="entity-link">MovieFestivalPrizesForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieForm.html" data-type="entity-link">MovieForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieMainForm.html" data-type="entity-link">MovieMainForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoviePrizeForm.html" data-type="entity-link">MoviePrizeForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoviePromotionalDescriptionForm.html" data-type="entity-link">MoviePromotionalDescriptionForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoviePromotionalElementForm.html" data-type="entity-link">MoviePromotionalElementForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoviePromotionalElementsForm.html" data-type="entity-link">MoviePromotionalElementsForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieSalesAgentDealForm.html" data-type="entity-link">MovieSalesAgentDealForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieSalesCastForm.html" data-type="entity-link">MovieSalesCastForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieSalesInfoForm.html" data-type="entity-link">MovieSalesInfoForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieStoryForm.html" data-type="entity-link">MovieStoryForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovieVersionInfoForm.html" data-type="entity-link">MovieVersionInfoForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizationProfileForm.html" data-type="entity-link">OrganizationProfileForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordControl.html" data-type="entity-link">PasswordControl</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductionCompagnyForm.html" data-type="entity-link">ProductionCompagnyForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileForm.html" data-type="entity-link">ProfileForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/RepeatPasswordStateMatcher.html" data-type="entity-link">RepeatPasswordStateMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/RightsForm.html" data-type="entity-link">RightsForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchResult.html" data-type="entity-link">SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchResults.html" data-type="entity-link">SearchResults</a>
                            </li>
                            <li class="link">
                                <a href="classes/SigninForm.html" data-type="entity-link">SigninForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupForm.html" data-type="entity-link">SignupForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/TitleForm.html" data-type="entity-link">TitleForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/XorControlsStateMatcher.html" data-type="entity-link">XorControlsStateMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthQuery.html" data-type="entity-link">AuthQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthStore.html" data-type="entity-link">AuthStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContextMenuQuery.html" data-type="entity-link">ContextMenuQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContextMenuService.html" data-type="entity-link">ContextMenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContextMenuStore.html" data-type="entity-link">ContextMenuStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryActiveGuard.html" data-type="entity-link">DeliveryActiveGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryListGuard.html" data-type="entity-link">DeliveryListGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryMaterialsGuard.html" data-type="entity-link">DeliveryMaterialsGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryQuery.html" data-type="entity-link">DeliveryQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryService.html" data-type="entity-link">DeliveryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeliveryStore.html" data-type="entity-link">DeliveryStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FireQuery.html" data-type="entity-link">FireQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconComponent.html" data-type="entity-link">IconComponent</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImageUploader.html" data-type="entity-link">ImageUploader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImdbService.html" data-type="entity-link">ImdbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvitationService.html" data-type="entity-link">InvitationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IpHashContract.html" data-type="entity-link">IpHashContract</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IpQuery.html" data-type="entity-link">IpQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IpService.html" data-type="entity-link">IpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IpStore.html" data-type="entity-link">IpStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeyManagerQuery.html" data-type="entity-link">KeyManagerQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeyManagerService.html" data-type="entity-link">KeyManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/KeyManagerStore.html" data-type="entity-link">KeyManagerStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MaterialQuery.html" data-type="entity-link">MaterialQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MaterialService.html" data-type="entity-link">MaterialService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MaterialStore.html" data-type="entity-link">MaterialStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieCollectionGuard.html" data-type="entity-link">MovieCollectionGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieMaterialsGuard.html" data-type="entity-link">MovieMaterialsGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieOrganizationActiveGuard.html" data-type="entity-link">MovieOrganizationActiveGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieOrganizationListGuard.html" data-type="entity-link">MovieOrganizationListGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieQuery.html" data-type="entity-link">MovieQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieService.html" data-type="entity-link">MovieService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MovieStore.html" data-type="entity-link">MovieStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationQuery.html" data-type="entity-link">NotificationQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsGuard.html" data-type="entity-link">NotificationsGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationStore.html" data-type="entity-link">NotificationStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationGuard.html" data-type="entity-link">OrganizationGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationQuery.html" data-type="entity-link">OrganizationQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationService.html" data-type="entity-link">OrganizationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganizationStore.html" data-type="entity-link">OrganizationStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsGuard.html" data-type="entity-link">PermissionsGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsQuery.html" data-type="entity-link">PermissionsQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link">PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsStore.html" data-type="entity-link">PermissionsStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Relayer.html" data-type="entity-link">Relayer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StakeholderQuery.html" data-type="entity-link">StakeholderQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StakeholderService.html" data-type="entity-link">StakeholderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StakeholderStore.html" data-type="entity-link">StakeholderStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateActiveGuard.html" data-type="entity-link">TemplateActiveGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateListGuard.html" data-type="entity-link">TemplateListGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateQuery.html" data-type="entity-link">TemplateQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateService.html" data-type="entity-link">TemplateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateStore.html" data-type="entity-link">TemplateStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WalletQuery.html" data-type="entity-link">WalletQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WalletService.html" data-type="entity-link">WalletService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WalletStore.html" data-type="entity-link">WalletStore</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IpGuard.html" data-type="entity-link">IpGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IpResolver.html" data-type="entity-link">IpResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StateActiveGuard.html" data-type="entity-link">StateActiveGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/StateListGuard.html" data-type="entity-link">StateListGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WalletActiveGuard.html" data-type="entity-link">WalletActiveGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WalletKeyGuard.html" data-type="entity-link">WalletKeyGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WalletTxGuard.html" data-type="entity-link">WalletTxGuard</a>
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
                                <a href="interfaces/ActionItemAction.html" data-type="entity-link">ActionItemAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionItemLink.html" data-type="entity-link">ActionItemLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionPickerItem.html" data-type="entity-link">ActionPickerItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionPickerListItem.html" data-type="entity-link">ActionPickerListItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionTx.html" data-type="entity-link">ActionTx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddDeliveryOptions.html" data-type="entity-link">AddDeliveryOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Addresses.html" data-type="entity-link">Addresses</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressParts.html" data-type="entity-link">AddressParts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppDetails.html" data-type="entity-link">AppDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppDetailsWithStatus.html" data-type="entity-link">AppDetailsWithStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppPermissions.html" data-type="entity-link">AppPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link">AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BFDoc.html" data-type="entity-link">BFDoc</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmPassword.html" data-type="entity-link">ConfirmPassword</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContextMenu.html" data-type="entity-link">ContextMenu</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContextMenuState.html" data-type="entity-link">ContextMenuState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credit.html" data-type="entity-link">Credit</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CurrencyWithLabel.html" data-type="entity-link">CurrencyWithLabel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateRange.html" data-type="entity-link">DateRange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateRangeRaw.html" data-type="entity-link">DateRangeRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Delivery.html" data-type="entity-link">Delivery</a>
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
                                <a href="interfaces/DeliveryState.html" data-type="entity-link">DeliveryState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeliveryWithTimestamps.html" data-type="entity-link">DeliveryWithTimestamps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DeliveryWizard.html" data-type="entity-link">DeliveryWizard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link">DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData-1.html" data-type="entity-link">DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDeliveryList.html" data-type="entity-link">IDeliveryList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INgContract.html" data-type="entity-link">INgContract</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Invitation.html" data-type="entity-link">Invitation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationFromOrganizationToUser.html" data-type="entity-link">InvitationFromOrganizationToUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationFromOrganizationToUserOptions.html" data-type="entity-link">InvitationFromOrganizationToUserOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationFromUserToOrganization.html" data-type="entity-link">InvitationFromUserToOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationFromUserToOrganizationOptions.html" data-type="entity-link">InvitationFromUserToOrganizationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationState.html" data-type="entity-link">InvitationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationToWorkOnDocument.html" data-type="entity-link">InvitationToWorkOnDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitationToWorkOnDocumentOptions.html" data-type="entity-link">InvitationToWorkOnDocumentOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ip.html" data-type="entity-link">Ip</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IpHash.html" data-type="entity-link">IpHash</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IpState.html" data-type="entity-link">IpState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Key.html" data-type="entity-link">Key</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/KeyState.html" data-type="entity-link">KeyState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialDocument.html" data-type="entity-link">MaterialDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialRaw.html" data-type="entity-link">MaterialRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialState.html" data-type="entity-link">MaterialState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialTemplateDocument.html" data-type="entity-link">MaterialTemplateDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItem.html" data-type="entity-link">MenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetaTx.html" data-type="entity-link">MetaTx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MGDeadline.html" data-type="entity-link">MGDeadline</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MGDeadlineRaw.html" data-type="entity-link">MGDeadlineRaw</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link">Model</a>
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
                                <a href="interfaces/MovieImportState.html" data-type="entity-link">MovieImportState</a>
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
                                <a href="interfaces/MovieRequest.html" data-type="entity-link">MovieRequest</a>
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
                                <a href="interfaces/MovieState.html" data-type="entity-link">MovieState</a>
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
                                <a href="interfaces/NotificationState.html" data-type="entity-link">NotificationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OmdbError.html" data-type="entity-link">OmdbError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OmdbMovie.html" data-type="entity-link">OmdbMovie</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OmdbSearch.html" data-type="entity-link">OmdbSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OmdbSearchResult.html" data-type="entity-link">OmdbSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OperationMember.html" data-type="entity-link">OperationMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Organization.html" data-type="entity-link">Organization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAction.html" data-type="entity-link">OrganizationAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationAlgoliaResult.html" data-type="entity-link">OrganizationAlgoliaResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationDocument.html" data-type="entity-link">OrganizationDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationForm.html" data-type="entity-link">OrganizationForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationMember.html" data-type="entity-link">OrganizationMember</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationMemberRequest.html" data-type="entity-link">OrganizationMemberRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationOperation.html" data-type="entity-link">OrganizationOperation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationProfile.html" data-type="entity-link">OrganizationProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrganizationState.html" data-type="entity-link">OrganizationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrgDocPermissions.html" data-type="entity-link">OrgDocPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permissions.html" data-type="entity-link">Permissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Prize.html" data-type="entity-link">Prize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Profile.html" data-type="entity-link">Profile</a>
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
                                <a href="interfaces/PublicOrganization-1.html" data-type="entity-link">PublicOrganization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PublicUser.html" data-type="entity-link">PublicUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PublicUser-1.html" data-type="entity-link">PublicUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RawAction.html" data-type="entity-link">RawAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RawOperation.html" data-type="entity-link">RawOperation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SalesImportState.html" data-type="entity-link">SalesImportState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchRequest.html" data-type="entity-link">SearchRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SheetTab.html" data-type="entity-link">SheetTab</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignedMetaTx.html" data-type="entity-link">SignedMetaTx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignIn.html" data-type="entity-link">SignIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignUp.html" data-type="entity-link">SignUp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SlugAndLabel.html" data-type="entity-link">SlugAndLabel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpreadsheetImportError.html" data-type="entity-link">SpreadsheetImportError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpreadsheetImportEvent.html" data-type="entity-link">SpreadsheetImportEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stakeholder.html" data-type="entity-link">Stakeholder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StakeholderDocument.html" data-type="entity-link">StakeholderDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StakeholderState.html" data-type="entity-link">StakeholderState</a>
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
                                <a href="interfaces/Template.html" data-type="entity-link">Template</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TemplateDocument.html" data-type="entity-link">TemplateDocument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TemplateState.html" data-type="entity-link">TemplateState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tile.html" data-type="entity-link">Tile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Title.html" data-type="entity-link">Title</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tx.html" data-type="entity-link">Tx</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TxFeedback.html" data-type="entity-link">TxFeedback</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDocPermissions.html" data-type="entity-link">UserDocPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserForm.html" data-type="entity-link">UserForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Wallet.html" data-type="entity-link">Wallet</a>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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
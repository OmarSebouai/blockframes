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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a14046013debc47ed5b09c635d2c5a96"' : 'data-target="#xs-components-links-module-AppModule-a14046013debc47ed5b09c635d2c5a96"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a14046013debc47ed5b09c635d2c5a96"' :
                                            'id="xs-components-links-module-AppModule-a14046013debc47ed5b09c635d2c5a96"' }>
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
                                <a href="modules/CatalogCompletionModule.html" data-type="entity-link">CatalogCompletionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CatalogCompletionModule-6335a8d1a0b59fe399ffcf7bd21b1671"' : 'data-target="#xs-components-links-module-CatalogCompletionModule-6335a8d1a0b59fe399ffcf7bd21b1671"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CatalogCompletionModule-6335a8d1a0b59fe399ffcf7bd21b1671"' :
                                            'id="xs-components-links-module-CatalogCompletionModule-6335a8d1a0b59fe399ffcf7bd21b1671"' }>
                                            <li class="link">
                                                <a href="components/CatalogCompletionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CatalogCompletionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatalogFormSelectionModule.html" data-type="entity-link">CatalogFormSelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CatalogFormSelectionModule-6e5ad8638645746c1b8af81d5aa1ffe4"' : 'data-target="#xs-components-links-module-CatalogFormSelectionModule-6e5ad8638645746c1b8af81d5aa1ffe4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CatalogFormSelectionModule-6e5ad8638645746c1b8af81d5aa1ffe4"' :
                                            'id="xs-components-links-module-CatalogFormSelectionModule-6e5ad8638645746c1b8af81d5aa1ffe4"' }>
                                            <li class="link">
                                                <a href="components/CatalogFormSelectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CatalogFormSelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DistributionRightCreateModule.html" data-type="entity-link">DistributionRightCreateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DistributionRightCreateModule-28dd711e191c6408b04b49902c4cd769"' : 'data-target="#xs-components-links-module-DistributionRightCreateModule-28dd711e191c6408b04b49902c4cd769"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DistributionRightCreateModule-28dd711e191c6408b04b49902c4cd769"' :
                                            'id="xs-components-links-module-DistributionRightCreateModule-28dd711e191c6408b04b49902c4cd769"' }>
                                            <li class="link">
                                                <a href="components/DistributionRightCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DistributionRightCreateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MarketplaceHomeModule.html" data-type="entity-link">MarketplaceHomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MarketplaceHomeModule-0b04602e625d15d3250b752136864091"' : 'data-target="#xs-components-links-module-MarketplaceHomeModule-0b04602e625d15d3250b752136864091"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MarketplaceHomeModule-0b04602e625d15d3250b752136864091"' :
                                            'id="xs-components-links-module-MarketplaceHomeModule-0b04602e625d15d3250b752136864091"' }>
                                            <li class="link">
                                                <a href="components/MarketplaceHomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarketplaceHomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MarketplaceSearchModule.html" data-type="entity-link">MarketplaceSearchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MarketplaceSearchModule-0023d544876fa80d881754c009babc4b"' : 'data-target="#xs-components-links-module-MarketplaceSearchModule-0023d544876fa80d881754c009babc4b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MarketplaceSearchModule-0023d544876fa80d881754c009babc4b"' :
                                            'id="xs-components-links-module-MarketplaceSearchModule-0023d544876fa80d881754c009babc4b"' }>
                                            <li class="link">
                                                <a href="components/MarketplaceSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarketplaceSearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MovieViewModule.html" data-type="entity-link">MovieViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MovieViewModule-f8c63c826a89dc9e10538342f00ce355"' : 'data-target="#xs-components-links-module-MovieViewModule-f8c63c826a89dc9e10538342f00ce355"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MovieViewModule-f8c63c826a89dc9e10538342f00ce355"' :
                                            'id="xs-components-links-module-MovieViewModule-f8c63c826a89dc9e10538342f00ce355"' }>
                                            <li class="link">
                                                <a href="components/MarketplaceMovieViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarketplaceMovieViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SelectionModule.html" data-type="entity-link">SelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SelectionModule-fead55c2c6ea88e4264f0d22955ddacf"' : 'data-target="#xs-components-links-module-SelectionModule-fead55c2c6ea88e4264f0d22955ddacf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SelectionModule-fead55c2c6ea88e4264f0d22955ddacf"' :
                                            'id="xs-components-links-module-SelectionModule-fead55c2c6ea88e4264f0d22955ddacf"' }>
                                            <li class="link">
                                                <a href="components/MarketplaceSelectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarketplaceSelectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/CatalogSearchForm.html" data-type="entity-link">CatalogSearchForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/DistributionRightForm.html" data-type="entity-link">DistributionRightForm</a>
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
                                    <a href="injectables/BasketQuery.html" data-type="entity-link">BasketQuery</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BasketService.html" data-type="entity-link">BasketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BasketStore.html" data-type="entity-link">BasketStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogBasketGuard.html" data-type="entity-link">CatalogBasketGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogMovieActiveGuard.html" data-type="entity-link">CatalogMovieActiveGuard</a>
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
                                <a href="interfaces/BasketState.html" data-type="entity-link">BasketState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarouselSection.html" data-type="entity-link">CarouselSection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CatalogBasket.html" data-type="entity-link">CatalogBasket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CatalogSearch.html" data-type="entity-link">CatalogSearch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DistributionRight.html" data-type="entity-link">DistributionRight</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieData.html" data-type="entity-link">MovieData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MovieLanguageSpecification.html" data-type="entity-link">MovieLanguageSpecification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Price.html" data-type="entity-link">Price</a>
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
import { Movie } from '@blockframes/movie/movie/+state/movie.model';
import { AFM_DISABLE } from '@env';
import { DistributionDeal } from '@blockframes/movie/distribution-deals/+state/distribution-deal.model';
import { ExtractSlug } from '@blockframes/utils/static-model/staticModels';
import { NumberRange } from '@blockframes/utils/common-interfaces';
import { LanguagesLabel } from '@blockframes/utils/static-model/types';
import { TerritoriesSlug, MediasSlug } from '@blockframes/utils/static-model/types';
import { CatalogSearch } from '@blockframes/catalog/form/search.form';
import { getDistributionDealsWithMediasTerritoriesAndLanguagesInCommon, getDistributionDealsInDateRange, getExclusiveDeals } from '@blockframes/movie/distribution-deals/create/availabilities.util';
import { MovieLanguageSpecification } from '@blockframes/movie/movie+state/movie.firestore';

function productionYearBetween(movie: Movie, range: { from: number; to: number }): boolean {
  if (!range || !(range.from && range.to)) {
    return true;
  }
  // prevent from default error that property is undefined
  if (typeof range.from && typeof range.to) {
    return movie.main.productionYear >= range.from && movie.main.productionYear <= range.to;
  }
}

function hasLanguage(movie: Movie, language: { [languageLabel in LanguagesLabel]: MovieLanguageSpecification }) {
    if (Object.entries(language).length === 0) {
      return true;
    }
    const languages = Object.keys(language);
    for (const lang of languages) {
      if (movie.versionInfo.languages.hasOwnProperty(lang)) {

        const movieLanguage = movie.versionInfo.languages[lang];
        const filterLanguage = language[lang];

        // When no checkbox is checked, we just verify the key.
        if (!filterLanguage.original && !filterLanguage.dubbed && !filterLanguage.subtitle && !filterLanguage.caption) {
          return true;
        }

        if (filterLanguage.original && movieLanguage.original) {
          return true;
        }
        if (filterLanguage.dubbed && movieLanguage.dubbed) {
          return true;
        }
        if (filterLanguage.subtitle && movieLanguage.subtitle) {
          return true;
        }
        if (filterLanguage.caption && movieLanguage.caption) {
          return true;
        }
      }
    }
}

function genres(movie: Movie, movieGenre: string[]): boolean {
  if (!movieGenre.length) {
    return true;
  }
  // we have to make it lowercase to make sure we are comparing correctly
  const movieGenreToLowerCase = movieGenre.map(type => type.toLowerCase());
  for (let i = 0; i < movie.main.genres.length; i++) {
    for (let k = 0; k < movieGenreToLowerCase.length; k++) {
      if (movie.main.genres[i] === movieGenreToLowerCase[k]) {
        return true;
      }
    }
  }
}

function hasBudget(movie: Movie, movieBudget: NumberRange[]) {
  if (!movieBudget.length) {
    return true;
  }
  const movieEstimatedBudget = movie.budget.estimatedBudget;
  for (const budget of movieBudget) {
    if (budget.from === movieEstimatedBudget.from && budget.to === movieEstimatedBudget.to) {
      return true;
    }
  }
}

function productionStatus(movie: Movie, movieStatus: string[]): boolean {
  if (!movieStatus.length) {
    return true;
  }
  // we have to make it lowercase to make sure we are comparing correctly
  const movieStatusToLowerCase = movieStatus.map(status => status.toLowerCase());
  for (let i = 0; i < movieStatusToLowerCase.length; i++) {
    if (movieStatusToLowerCase[i] === movie.main.status) {
      return true;
    }
  }
}

function salesAgent(movie: Movie, salesAgents: string[]): boolean {
  if (!salesAgents.length) {
    return true;
  }
  for (let i = 0; i < salesAgents.length; i++) {
    if (salesAgents[i] === movie.salesAgentDeal.salesAgent.displayName) {
      return true;
    }
  }
}

function certifications(movie: Movie, movieCertification: string[]): boolean {
  if (!movieCertification.length) {
    return true;
  }
  // we have to make it lowercase to make sure we are comapring correctly
  const movieFilterCertificationToLowerCase = movieCertification.map(certification =>
    certification.toLowerCase()
  );
  const movieCertificationToLowerCase = movie.salesInfo.certifications.map(cert =>
    cert.toLowerCase()
  );
  for (let i = 0; i <= movieFilterCertificationToLowerCase.length; i++) {
    for (let k = 0; k <= movieCertificationToLowerCase.length; k++) {
      if (movieCertificationToLowerCase[i] === movieFilterCertificationToLowerCase[k]) {
        return true;
      }
    }
  }
}

/**
 * Returns a boolean weither a deal is matching with our search or not.
 * @param deals all the deals from the movies in the filterForm
 * @param range the range of date specified in the filterForm
 * @param territories the territories added in the filterForm
 * @param medias the medias checked in the filterForm
 * @param exclusivity the value of the exclusivity toggle
 * @param langages the langages from the filterForm
 */
function availabilities(
  deals: DistributionDeal[],
  range: { from: Date; to: Date },
  territories: TerritoriesSlug[],
  medias: MediasSlug[],
  exclusivity: boolean,
  langages?: MovieLanguageSpecification
  ): boolean {
  if (!range || !(range.from && range.to)) {
    return true;
  }

  const matchingExclusivityDeals = getExclusiveDeals(exclusivity, deals);
  const matchingRangeDeals = getDistributionDealsInDateRange(range, matchingExclusivityDeals);
  const matchingDeals = getDistributionDealsWithMediasTerritoriesAndLanguagesInCommon(territories, medias, matchingRangeDeals, langages);

  return matchingDeals.length ? true : false;
}

function hasCountry(movie: Movie, countries: string[]): boolean {
  if (!countries.length) {
    return true;
  }
  for (const country of countries) {
    if (movie.main.originCountries.includes(country.toLowerCase() as ExtractSlug<'TERRITORIES'>)) {
      return true;
    }
  }
}

function hasTerritories(movie: Movie, filterTerritories: string[]): boolean {
  if (!filterTerritories.length) {
    return true;
  }
  return filterTerritories.every(territory =>
    movie.salesAgentDeal.territories.includes(territory.toLowerCase() as ExtractSlug<'TERRITORIES'>)
  );
}

function hasMedias(movie: Movie, filterMedias: string[]): boolean {
  if (!filterMedias.length) {
    return true;
  }
  return filterMedias.every(movieMedia =>
    movie.salesAgentDeal.medias.includes(movieMedia.toLowerCase() as ExtractSlug<'MEDIAS'>)
  );
}

// TODO #1306 - remove when algolia is ready
export function filterMovie(movie: Movie, filter: CatalogSearch, deals?: DistributionDeal[]): boolean {
  const hasEveryLanguage = Object.keys(filter.languages)
    .map(name => ({
      ...filter.languages[name],
      name
    }))
    .every(language => hasLanguage(movie, language));

  return (
    productionYearBetween(movie, filter.productionYear) &&
    hasEveryLanguage &&
    genres(movie, filter.genres) &&
    certifications(movie, filter.certifications) &&
    productionStatus(movie, filter.status) &&
    availabilities(deals, filter.availabilities, filter.territories, filter.medias, filter.exclusivity) &&
    hasTerritories(movie, filter.territories) &&
    hasMedias(movie, filter.medias) &&
    hasCountry(movie, filter.originCountries) &&
    hasLanguage(movie, filter.languages)
  );
}

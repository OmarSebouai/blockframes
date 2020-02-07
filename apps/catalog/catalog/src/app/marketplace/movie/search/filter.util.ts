import { CatalogSearch } from './search.form';
import { Movie } from '@blockframes/movie/movie/+state/movie.model';
import { AFM_DISABLE } from '@env';
import { DistributionDeal } from '@blockframes/movie/distribution-deals/+state/distribution-deal.model';
import { ExtractSlug } from '@blockframes/utils/static-model/staticModels';
import { LanguagesSlug } from '@blockframes/utils/static-model/types';

function productionYearBetween(movie: Movie, range: { from: number; to: number }): boolean {
  if (!range || !(range.from && range.to)) {
    return true;
  }
  // prevent from default error that property is undefined
  if (typeof range.from && typeof range.to) {
    return movie.main.productionYear >= range.from && movie.main.productionYear <= range.to;
  }
}
function hasLanguage(
  movie: Movie,
  language: { name: LanguagesSlug; original: boolean; dubbed: boolean; subtitle: boolean; caption: boolean }
): boolean {
  if (!language) {
    return true;
  }

  let original = true;
  let dubbed = true;
  let subtitle = true;
  let caption = true;

  if (language.original) {
    original = movie.versionInfo.languages[language.name].original;
  }

  if (language.dubbed) {
    dubbed = movie.versionInfo.languages[language.name].dubbed;
  }

  if (language.subtitle) {
    subtitle = movie.versionInfo.languages[language.name].subtitle;
  }

  if (language.caption) {
    caption = movie.versionInfo.languages[language.name].caption;
  }

  return original && dubbed && subtitle && caption;
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
// TODO #979 - check if availabilities filter is needed
function availabilities(deals: DistributionDeal[], range: { from: Date; to: Date }): boolean {
  if (!range || !(range.from && range.to)) {
    return true;
  }
  return (
    deals.some(deal => {
      if (deal.terms) {
        /**
         * Check if terms.start is inside of a deal
         */
        return deal.terms.start.getTime() < range.from.getTime();
      }
    }) &&
    deals.some(deal => {
      if (deal.terms) {
        return deal.terms.end.getTime() > range.to.getTime();
      }
    })
  );
}

function territories(movie: Movie, territory: string): boolean {
  if (!territory) {
    return true;
  }
  return movie.salesAgentDeal.territories.includes(territory.toLowerCase() as ExtractSlug<'TERRITORIES'>);
}
function media(movie: Movie, movieMediaType: string): boolean {
  if (!movieMediaType) {
    return true;
  }
  return movie.salesAgentDeal.medias.includes(movieMediaType.toLowerCase() as any);
}

// TODO #1306 - remove when algolia is ready
export function filterMovie(movie: Movie, filter: CatalogSearch, deals?: DistributionDeal[]): boolean {
  const hasEveryLanguage = Object.keys(filter.languages)
    .map(name => ({
      ...filter.languages[name],
      name
    }))
    .every(language => hasLanguage(movie, language));
  const hasMedia = filter.medias.every(movieMedia => media(movie, movieMedia));
  const hasTerritory = filter.territories.every(territory => territories(movie, territory));
  if (AFM_DISABLE) {
    //TODO: #1146
    return (
      productionYearBetween(movie, filter.productionYear) &&
      hasEveryLanguage &&
      genres(movie, filter.genres) &&
      certifications(movie, filter.certifications) &&
      productionStatus(movie, filter.status) &&
      availabilities(deals, filter.availabilities) &&
      hasTerritory &&
      hasMedia
    );
  } else {
    return (
      hasEveryLanguage &&
      genres(movie, filter.genres) &&
      productionStatus(movie, filter.status) &&
      salesAgent(movie, filter.salesAgent)
    );
  }
}

import { TunnelSummaryPage } from "../pages/dashboard";

// Tests variables
import { CONTENT_TYPES, DIRECTORS, MAIN_COUNTRIES, MEDIA, MAIN_LANGUAGES, GENRE, CAST_MEMBERS, FESTIVALS, AWARDS, PREMIERE, YEAR } from "./1-main";
// Change cause of difference of typo
CONTENT_TYPES[0] = 'Tv Film';
const RUNTIME = '1h 27m';
const DATE = '10/10/07';

export const summaryTest = () => {
  const p1 = new TunnelSummaryPage();

  // Main
  p1.assertMainFields(CONTENT_TYPES);
  p1.assertMainFields(DIRECTORS);
  p1.assertCountriesOfOriginFields([MAIN_COUNTRIES[0], MEDIA, DATE]);
  p1.assertMainInformation(MAIN_LANGUAGES);
  p1.assertMainInformation([GENRE, RUNTIME]);
  p1.assertSalesCast(CAST_MEMBERS);
  p1.assertFestivalPrizes(FESTIVALS);
  p1.assertFestivalPrizes(AWARDS);
  p1.assertFestivalPrizes([PREMIERE, YEAR]);
};

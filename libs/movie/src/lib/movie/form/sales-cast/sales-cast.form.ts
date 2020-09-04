import { Credit, Movie, createMovie } from '../../+state';
import { FormEntity, FormList } from '@blockframes/utils/form/forms';
import { FormControl } from '@angular/forms';
import { createCredit } from '@blockframes/utils/common-interfaces/identity';

function createMovieSalesCastControls(salesCast?: Partial<Movie>) {
  const entity = createMovie(salesCast);
  return {
    producers: FormList.factory(entity.producers, el => new CreditForm(el)),
    cast: FormList.factory(entity.cast, el => new CreditForm(el)),
    crew: FormList.factory(entity.crew, el => new CreditForm(el)),
  }
}

export type MovieSalesCastControl = ReturnType<typeof createMovieSalesCastControls>

function createCreditControls(credit?: Partial<Credit>) {
  const { firstName, lastName, role, description, filmography, status } = createCredit(credit);
  return {
    firstName: new FormControl(firstName),
    lastName: new FormControl(lastName),
    role: new FormControl(role),
    description: new FormControl(description),
    filmography: new FormControl(filmography),
    status: new FormControl(status),
  }
}

type CreditControl = ReturnType<typeof createCreditControls>;

export class CreditForm extends FormEntity<CreditControl>{
  constructor(credit?: Credit) {
    super(createCreditControls(credit));
  }
}

export class MovieSalesCastForm extends FormEntity<MovieSalesCastControl>{
  constructor(salesCast?: Movie) {
    super(createMovieSalesCastControls(salesCast));
  }

  get cast() {
    return this.get('cast');
  }

  get producers() {
    return this.get('producers');
  }

  get crew() {
    return this.get('crew');
  }

  public addCredit(credit?: Partial<Credit>, type: 'cast' | 'crew' | 'producer' = 'cast'): void {
    switch (type) {
      case 'producer':
        const producer = createCredit(credit);
        const producerControl = new CreditForm(producer);
        this.producers.push(producerControl);
        break;
      case 'crew':
        const crew = createCredit(credit);
        const crewControl = new CreditForm(crew);
        this.crew.push(crewControl);
        break;
      case 'cast':
      default:
        const cast = createCredit(credit);
        const castControl = new CreditForm(cast);
        this.cast.push(castControl);
        break;
    }
  }

  public removeCredit(i: number, type: 'cast' | 'crew' | 'producer' = 'cast'): void {
    switch (type) {
      case 'producer':
        this.producers.removeAt(i);
        break;
      case 'crew':
        this.crew.removeAt(i);
        break;
      case 'cast':
      default:
        this.cast.removeAt(i);
        break;
    }
  }

}

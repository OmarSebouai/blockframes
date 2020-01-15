import { FormEntity, FormList, yearValidators } from '@blockframes/utils';
import { MovieMain, Credit, createMovieMain, Movie, createTitle } from '../../+state';
import { Validators, FormControl } from '@angular/forms';
import { createCredit, Stakeholder, createStakeholder } from '@blockframes/utils/common-interfaces/identity';
import { valueIsInModelValidator } from '@blockframes/utils/form/validators/validators';

function createCreditFormControl(credit?: Partial<Credit>) {
  const { firstName, lastName, role } = createCredit(credit);
  return {
    firstName: new FormControl(firstName),
    lastName: new FormControl(lastName),
    role: new FormControl(role),
  }
}

export type CreditFormControl = ReturnType<typeof createCreditFormControl>;

export class MovieCreditForm extends FormEntity<CreditFormControl> {
  constructor(credit?: Credit) {
    super(createCreditFormControl(credit));
  }
}

export class DirectorForm extends FormEntity<DirectorFormControl> {
  constructor(director?: Partial<Credit>) {
    super(createDirectorFormControl(director))
  }
}

function createDirectorFormControl(director?: Partial<Credit>) {
  const { firstName, lastName } = createCredit(director);
  return {
    firstName: new FormControl(firstName),
    lastName: new FormControl(lastName),
  }
}

type DirectorFormControl = ReturnType<typeof createDirectorFormControl>;

export class StakeholdersForm extends FormEntity<StakeholdersControl> {
  constructor(stakeholder?: Partial<Stakeholder>) {
    super(createStakeholdersControl(stakeholder))
  }
}

function createStakeholdersControl(stakeholder?: Partial<Stakeholder>) {
  const { displayName } = createStakeholder(stakeholder);
  return {
    displayName: new FormControl(displayName),
  }
}

type StakeholdersControl = ReturnType<typeof createStakeholdersControl>;


export class TitleForm extends FormEntity<TitleFormControl> {
  constructor(title?: Movie['main']['title']) {
    super(createTitleFormControl(title));
  }
}

function createTitleFormControl(title?: Partial<Movie['main']['title']>) {
  const { original, international } = createTitle(title);
  return {
    original: new FormControl(original),
    international: new FormControl(international),
  }
}

type TitleFormControl = ReturnType<typeof createTitleFormControl>;

function createMovieMainControls(main : Partial<MovieMain> = {}) {
  const entity = createMovieMain(main);
  return {
    internalRef: new FormControl(entity.internalRef),
    isan: new FormControl(entity.isan),
    title: new TitleForm(entity.title),
    directors: FormList.factory(entity.directors, el => new DirectorForm(el)),
    poster: new FormControl(entity.poster),
    productionYear: new FormControl(entity.productionYear, yearValidators),
    genres: new FormControl(entity.genres),
    originCountries: FormList.factory(entity.originCountries, el => new FormControl(el)),
    originalLanguages: new FormControl(entity.originalLanguages),
    status: new FormControl(entity.status , [Validators.required]),
    totalRunTime: new FormControl(entity.totalRunTime),
    shortSynopsis: new FormControl(entity.shortSynopsis, [Validators.maxLength(500)] ),
    stakeholders: FormList.factory(entity.stakeholders, el => new StakeholdersForm(el)),
    workType: new FormControl(entity.workType),
    storeConfig: new StoreConfigForm(entity.storeConfig),
    customGenres: FormList.factory(entity.customGenres),
  }
}

export type MovieMainControl = ReturnType<typeof createMovieMainControls>

export class MovieMainForm extends FormEntity<MovieMainControl>{
  constructor(main: MovieMain) {
    super(createMovieMainControls(main));
  }

  get title() {
    return this.get('title');
  }

  get directors() {
    return this.get('directors');
  }

  get stakeholders() {
    return this.get('stakeholders');
  }

  get shortSynopsis() {
    return this.get('shortSynopsis');
  }

  public addDirector(credit?: Partial<Credit>): void {
    const entity = createCredit(credit);
    const creditControl = new DirectorForm(entity);
    this.directors.push(creditControl);
  }

  public removeDirector(i: number): void {
    this.directors.removeAt(i);
  }

  public addStakeholder(): void {
    const credit = new StakeholdersForm();
    this.stakeholders.push(credit);
  }

  public removeStakeholder(i: number): void {
    this.stakeholders.removeAt(i);
  }
}
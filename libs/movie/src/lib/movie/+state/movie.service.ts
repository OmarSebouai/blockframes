import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MovieStore } from './movie.store';
import { Movie, createMovie } from './movie.model';
import { takeWhile } from 'rxjs/operators';
import { createStakeholder } from '../../stakeholder/+state/stakeholder.model';
import { StakeholderService } from '../../stakeholder/+state/stakeholder.service';
import { OrganizationQuery } from '@blockframes/organization';
import { AuthQuery } from '@blockframes/auth';

@Injectable({ providedIn: 'root' })

export class MovieService {
  private collection: AngularFirestoreCollection<Movie>;
  public initiated = false;

  constructor(
  private store: MovieStore,
  private firestore: AngularFirestore,
  private orgQuery: OrganizationQuery,
  private shService: StakeholderService,
  private authQuery: AuthQuery,
  ) {
    this.collection = this.firestore.collection('movies');
  }

  /*
  Initiate Movies
  this.initiated turns false when user logout
  */
  public fetch_() {
    //if(this.initiated) return;
    //this.initiated = true;
    this.collection.valueChanges().pipe(
      //takeWhile(_ => this.initiated)
    ).subscribe(movies => this.store.set(movies));
  }

  public subscribeOrgMovies(orgId): void {
    //if (this.initiated) return;
    // TODO: if you try to suscribe with another orgId, the function will ignore you
    //this.initiated = true;
    return this.fetch_();
    this.firestore
     .collection<Movie>('movies', ref => ref.where('stakeholderIds', 'array-contains', orgId))
     .valueChanges().pipe(
      takeWhile(_ => this.initiated)
     ).subscribe(movies => this.store.set(movies));
  }

  public async add(title: string, orgId: string): Promise<string> {
    const id = this.firestore.createId();
    const owner = createStakeholder({orgId, orgMovieRole: 'ADMIN'});

    const movie: Partial<Movie> = createMovie({ id: id, title: [title] });
    // TODO: correct race condition
    await this.collection.doc(id).set(movie);
    await this.shService.add(id, owner);

    return id;
  }

  public update(id: string, movie: Partial<Movie>) {
    this.collection.doc(id).update(movie);
  }

  public remove(id: string) {
    this.collection.doc(id).delete()
  }

}

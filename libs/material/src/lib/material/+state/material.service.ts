import { Injectable } from '@angular/core';
import { filter, switchMap, tap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Material } from './material.model';
import { OrganizationQuery } from '@blockframes/organization';
import { AngularFirestore } from '@angular/fire/firestore';
import { MaterialStore } from './material.store';
import { DeliveryQuery } from '../../delivery/+state/delivery.query';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(
    private organizationQuery: OrganizationQuery,
    private db: AngularFirestore,
    private store: MaterialStore,
    private deliveryQuery: DeliveryQuery
  ) {}

  public subscribeOnActiveOrganizationMaterials$() {
    return this.organizationQuery.selectActiveId().pipe(
      filter(id => !!id),
      switchMap(id => this.db.collection<Material>(`orgs/${id}/materials`).valueChanges()),
      tap(materials => this.store.set(materials))
    );
  }

  public subscribeOnDeliveryMaterials$() {
    // TODO : switch this to FireQuery
    return this.deliveryQuery.selectActive().pipe(
      filter(delivery => !!delivery),
      switchMap(delivery =>
        this.db
          .collection<any>(`deliveries/${delivery.id}/materials`)
          .valueChanges()
          .pipe(
            map(materials => {
              return materials.map(material => {
                const step = delivery.steps.find(deliveryStep => deliveryStep.id === material.stepId);
                return { ...material, step }
              });
            })
          )
      ),
      tap(materials => this.store.set(materials))
    );
  }

  public subscribeOnAllOrgsMaterials$() {
    return this.organizationQuery.selectAll().pipe(
      switchMap(orgs =>
        combineLatest(
          orgs.map(org => this.db.collection<Material>(`orgs/${org.id}/materials`).valueChanges())
        )
      ),
      // for each org, we have an array of materials.
      // This flattens the array of array into a single array of materials:
      map(materials => [].concat.apply([], materials) as Material[]),
      tap(materials => this.store.set(materials))
    );
  }
}

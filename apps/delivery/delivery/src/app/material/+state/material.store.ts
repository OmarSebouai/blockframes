import { EntityState, EntityStore, StoreConfig, MultiActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Material } from './material.model';


export interface State extends EntityState<Material>, MultiActiveState<string[]> {
}

const initialState = {
  active: []
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'materials', idKey: 'id' })
export class MaterialStore extends EntityStore<State, Material> {
  constructor() {
    super(initialState);
  }

}

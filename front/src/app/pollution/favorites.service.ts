import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddFavorite,
  RemoveFavorite,
  ToggleFavorite,
  ClearFavorites,
  FavoritesState
} from './state/favorites.state';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly store = inject(Store);

  readonly favorites$: Observable<number[]> = this.store.select(FavoritesState.favoriteIds);
  readonly count$: Observable<number> = this.store.select(FavoritesState.count);

  isFavorite(pollutionId: number): boolean {
    return this.store.selectSnapshot(FavoritesState.isFavorite)(pollutionId);
  }

  toggle(pollutionId: number): void {
    this.store.dispatch(new ToggleFavorite(pollutionId));
  }

  add(pollutionId: number): void {
    this.store.dispatch(new AddFavorite(pollutionId));
  }

  remove(pollutionId: number): void {
    this.store.dispatch(new RemoveFavorite(pollutionId));
  }

  clear(): void {
    this.store.dispatch(new ClearFavorites());
  }
}

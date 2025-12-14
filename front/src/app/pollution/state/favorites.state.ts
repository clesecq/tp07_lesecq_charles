import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export class AddFavorite {
  static readonly type = '[Favorites] Add';
  constructor(public pollutionId: number) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove';
  constructor(public pollutionId: number) {}
}

export class ToggleFavorite {
  static readonly type = '[Favorites] Toggle';
  constructor(public pollutionId: number) {}
}

export class ClearFavorites {
  static readonly type = '[Favorites] Clear';
}

export interface FavoritesStateModel {
  ids: number[];
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    ids: []
  }
})
@Injectable()
export class FavoritesState {
  @Selector()
  static favoriteIds(state: FavoritesStateModel): number[] {
    return state.ids;
  }

  @Selector()
  static count(state: FavoritesStateModel): number {
    return state.ids.length;
  }

  @Selector()
  static isFavorite(state: FavoritesStateModel) {
    return (pollutionId: number) => state.ids.includes(pollutionId);
  }

  @Action(AddFavorite)
  add(ctx: StateContext<FavoritesStateModel>, action: AddFavorite) {
    const state = ctx.getState();
    if (!state.ids.includes(action.pollutionId)) {
      ctx.patchState({
        ids: [...state.ids, action.pollutionId]
      });
    }
  }

  @Action(RemoveFavorite)
  remove(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite) {
    const state = ctx.getState();
    ctx.patchState({
      ids: state.ids.filter((id) => id !== action.pollutionId)
    });
  }

  @Action(ToggleFavorite)
  toggle(ctx: StateContext<FavoritesStateModel>, action: ToggleFavorite) {
    const state = ctx.getState();
    if (state.ids.includes(action.pollutionId)) {
      ctx.dispatch(new RemoveFavorite(action.pollutionId));
    } else {
      ctx.dispatch(new AddFavorite(action.pollutionId));
    }
  }

  @Action(ClearFavorites)
  clear(ctx: StateContext<FavoritesStateModel>) {
    ctx.patchState({
      ids: []
    });
  }
}

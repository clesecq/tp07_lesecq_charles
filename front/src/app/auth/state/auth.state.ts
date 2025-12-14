import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface AuthUser {
  id: string;
  nom: string;
  prenom: string;
  login: string;
}

export class SetUser {
  static readonly type = '[Auth] Set User';
  constructor(public user: AuthUser) {}
}

export class ClearUser {
  static readonly type = '[Auth] Clear User';
}

export class SetAuthLoading {
  static readonly type = '[Auth] Set Loading';
  constructor(public loading: boolean) {}
}

export class SetAuthError {
  static readonly type = '[Auth] Set Error';
  constructor(public error: string | null) {}
}

export interface AuthStateModel {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    loading: false,
    error: null
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static user(state: AuthStateModel): AuthUser | null {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.user !== null;
  }

  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Action(SetUser)
  setUser(ctx: StateContext<AuthStateModel>, action: SetUser) {
    ctx.patchState({
      user: action.user,
      error: null
    });
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: null,
      error: null
    });
  }

  @Action(SetAuthLoading)
  setLoading(ctx: StateContext<AuthStateModel>, action: SetAuthLoading) {
    ctx.patchState({
      loading: action.loading
    });
  }

  @Action(SetAuthError)
  setError(ctx: StateContext<AuthStateModel>, action: SetAuthError) {
    ctx.patchState({
      error: action.error
    });
  }
}

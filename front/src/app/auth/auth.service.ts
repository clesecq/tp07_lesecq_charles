import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, finalize, tap, throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  AuthUser,
  SetUser,
  ClearUser,
  SetAuthLoading,
  SetAuthError,
  AuthState
} from './state/auth.state';

export type { AuthUser };

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  nom: string;
  prenom: string;
  login: string;
  pass: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly baseUrl = `${environment.apiUrl}/utilisateur`;

  readonly currentUser$: Observable<AuthUser | null> = this.store.select(AuthState.user);
  readonly isLoading$: Observable<boolean> = this.store.select(AuthState.loading);
  readonly error$: Observable<string | null> = this.store.select(AuthState.error);
  readonly isAuthenticated$: Observable<boolean> = this.store.select(AuthState.isAuthenticated);

  get currentUser(): AuthUser | null {
    return this.store.selectSnapshot(AuthState.user);
  }

  get isAuthenticated(): boolean {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  login(payload: LoginPayload) {
    this.store.dispatch(new SetAuthLoading(true));
    this.store.dispatch(new SetAuthError(null));

    return this.http.post<AuthUser>(`${this.baseUrl}/login`, payload).pipe(
      tap((user) => {
        this.store.dispatch(new SetUser(user));
      }),
      catchError((error) => {
        this.store.dispatch(new SetAuthError('Login ou mot de passe incorrect.'));
        return throwError(() => error);
      }),
      finalize(() => this.store.dispatch(new SetAuthLoading(false)))
    );
  }

  register(payload: RegisterPayload) {
    this.store.dispatch(new SetAuthLoading(true));
    this.store.dispatch(new SetAuthError(null));

    return this.http.post<AuthUser>(`${environment.apiUrl}/users`, payload).pipe(
      tap((user) => {
        this.store.dispatch(new SetUser(user));
      }),
      catchError((error) => {
        this.store.dispatch(
          new SetAuthError("Impossible de créer le compte. Le login existe peut-être déjà.")
        );
        return throwError(() => error);
      }),
      finalize(() => this.store.dispatch(new SetAuthLoading(false)))
    );
  }

  logout() {
    this.store.dispatch(new ClearUser());
    this.router.navigate(['/login']);
  }
}

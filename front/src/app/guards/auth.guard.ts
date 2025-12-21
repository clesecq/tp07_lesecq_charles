import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/state/auth.store';

/**
 * Auth Guard - Protège les routes qui nécessitent une authentification
 */
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

/**
 * Guest Guard - Redirige les utilisateurs authentifiés (pour login/register)
 */
export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);

  if (isAuthenticated) {
    router.navigate(['/']);
    return false;
  }

  return true;
};

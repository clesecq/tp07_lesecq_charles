import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { FavoritesService } from './pollution/favorites.service';
import { AuthState, Logout } from './auth/state/auth.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly favoritesService = inject(FavoritesService);

  readonly isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  readonly currentUser$ = this.store.select(AuthState.user);

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}

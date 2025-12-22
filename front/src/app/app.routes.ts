import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'pollutions',
		pathMatch: 'full'
	},
	{
		path: 'login',
		canActivate: [guestGuard],
		loadComponent: () =>
			import('./auth/pages/login.component').then((m) => m.LoginComponent)
	},
	{
		path: 'register',
		canActivate: [guestGuard],
		loadComponent: () =>
			import('./auth/pages/register.component').then((m) => m.RegisterComponent)
	},
	{
		path: 'pollutions',
		loadComponent: () =>
			import('./pollution/pages/pollution-list.component').then((m) => m.PollutionListComponent)
	},
	{
		path: 'pollutions/:id',
		loadComponent: () =>
			import('./pollution/pages/pollution-detail.component').then((m) => m.PollutionDetailComponent)
	},
	{
		path: 'favoris',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./pollution/pages/favorites-list.component').then((m) => m.FavoritesListComponent)
	},
	{
		path: 'users',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./user/pages/user-list.component').then((m) => m.UserListComponent)
	},
	{
		path: 'users/create',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./user/pages/user-create.component').then((m) => m.UserCreateComponent)
	},
	{
		path: '**',
		redirectTo: 'pollutions'
	}
];

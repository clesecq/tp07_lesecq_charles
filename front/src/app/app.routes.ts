import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'pollutions',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadComponent: () =>
			import('./auth/pages/login.component').then((m) => m.LoginComponent)
	},
	{
		path: 'register',
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
		loadComponent: () =>
			import('./pollution/pages/favorites-list.component').then((m) => m.FavoritesListComponent)
	},
	{
		path: 'users',
		loadComponent: () =>
			import('./user/pages/user-list.component').then((m) => m.UserListComponent)
	},
	{
		path: 'users/create',
		loadComponent: () =>
			import('./user/pages/user-create.component').then((m) => m.UserCreateComponent)
	},
	{
		path: '**',
		redirectTo: 'pollutions'
	}
];

import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'pollutions',
		pathMatch: 'full'
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
		path: '**',
		redirectTo: 'pollutions'
	}
];

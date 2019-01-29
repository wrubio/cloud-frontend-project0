import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// component Imports

const pageRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: PagesComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forRoot( pageRoutes, { useHash: true });

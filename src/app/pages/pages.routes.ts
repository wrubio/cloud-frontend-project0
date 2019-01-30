import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardsGuard } from '../services/services.index';

// component Imports

const pageRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardsGuard ],
        children: [
            { path: '', component: PagesComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forRoot( pageRoutes, { useHash: true });

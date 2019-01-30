import { Routes, RouterModule } from '@angular/router';

// component Imports
import { LoginComponent } from './login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: Page404Component }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });

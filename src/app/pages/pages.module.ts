import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Component
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';

// Routes
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [
      PagesComponent,
      DashboardComponent,
      Page404Component
  ],
  imports: [
    BrowserModule,
    PAGES_ROUTES
  ],
  exports: [
    DashboardComponent,
    Page404Component
  ],
  providers: [],
  bootstrap: []
})

export class PagesModule { }

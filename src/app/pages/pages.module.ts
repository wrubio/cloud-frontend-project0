import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Component
import { PagesComponent } from './pages.component';
import { ShareModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Page404Component } from './page404/page404.component';
import { EventComponent } from './event/event.component';


// Routes
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [
      PagesComponent,
      DashboardComponent,
      Page404Component,
      EventComponent
  ],
  imports: [
    BrowserModule,
    PAGES_ROUTES,
    ShareModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    Page404Component
  ],
  providers: [],
  bootstrap: []
})

export class PagesModule { }

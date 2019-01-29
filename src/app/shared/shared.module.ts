import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

// Component

@NgModule({
  declarations: [
      SidebarComponent,
      NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent
  ],
  providers: [],
  bootstrap: []
})

export class ShareModule { }

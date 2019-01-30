import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    UserService,
    LoginGuardsGuard,
    EventService
} from './services.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        LoginGuardsGuard,
        EventService
    ],
    declarations: []
})

export class ServiceModule {}

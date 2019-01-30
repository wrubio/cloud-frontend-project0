import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
    UserService,
    LoginGuardsGuard
} from './services.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        LoginGuardsGuard
    ],
    declarations: []
})

export class ServiceModule {}

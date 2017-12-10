import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TuringComponent} from './turing/turing.component';
import {TuringService} from './turing/turing.service';

@NgModule({
    declarations: [
        AppComponent,
        TuringComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        TuringService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

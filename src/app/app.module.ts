import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SearchBoxComponent} from './search-box/search-box.component';
import {ColorPickerComponent} from './color-picker/color-picker.component';
import {ColorSampleComponent} from './color-sample/color-sample.component';

@NgModule({
    declarations: [AppComponent, SearchBoxComponent, ColorPickerComponent, ColorSampleComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CustomHandler } from './custom-handler';
import { CoreModule } from './modules/core/core.module';
import {DetailsComponent} from './modules/core/Components/details/details.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    CoreModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomHandler,
     },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

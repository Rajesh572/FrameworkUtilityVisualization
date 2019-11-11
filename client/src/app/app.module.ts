import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { DetailsComponent } from './Components/details/details.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { TermsComponent } from './Components/terms/terms.component';
import { SubtermsComponent } from './Components/subterms/subterms.component';
import { AssociationsComponent } from './Components/associations/associations.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubtermsassociationComponent } from './Components/subtermsassociation/subtermsassociation.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    CategoriesComponent,
    TermsComponent,
    SubtermsComponent,
    AssociationsComponent,
    SubtermsassociationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

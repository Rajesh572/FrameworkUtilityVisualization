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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalComponent } from './Components/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DragAndDropModule } from 'angular-draggable-droppable';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DetailsComponent,
    CategoriesComponent,
    TermsComponent,
    SubtermsComponent,
    AssociationsComponent,
    SubtermsassociationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    DragAndDropModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SubtermsComponent, SubtermsassociationComponent, ModalComponent]
})
export class AppModule { }

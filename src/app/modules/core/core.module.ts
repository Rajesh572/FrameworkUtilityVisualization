import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { DetailsComponent } from './Components/details/details.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { TermsComponent } from './Components/terms/terms.component';
import { SubtermsComponent } from './Components/subterms/subterms.component';
import { AssociationsComponent } from './Components/associations/associations.component';
import { SubtermsassociationComponent } from './Components/subtermsassociation/subtermsassociation.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { OnHoverDirective } from './directives/on-hover.directive';
@NgModule({
  declarations: [
    HeaderComponent,
    DetailsComponent,
    CategoriesComponent,
    TermsComponent,
    SubtermsComponent,
    AssociationsComponent,
    SubtermsassociationComponent,
    SideBarComponent,
    OnHoverDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    DragAndDropModule
  ],
  exports: [DetailsComponent],
  entryComponents: [SubtermsComponent, SubtermsassociationComponent]
})
export class CoreModule { }

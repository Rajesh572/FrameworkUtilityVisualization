import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './Components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivemenuDirective } from './directives/activemenu.directive';

@NgModule({
  declarations: [
    ModalComponent,
  
    ActivemenuDirective,],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  entryComponents: [ModalComponent],
  exports: [ActivemenuDirective]
})
export class SharedModule { }

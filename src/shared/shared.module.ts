import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixComponent } from './matrix/matrix.component';
import { MatrixInputComponent } from './matrix-input/matrix-input.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        MatrixComponent,
        MatrixInputComponent
    ],
  exports: [
    MatrixComponent,
    MatrixInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

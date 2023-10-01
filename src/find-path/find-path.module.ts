import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindPathComponent } from './find-path.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [
        FindPathComponent
    ],
    exports: [
        FindPathComponent
    ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FindPathModule { }

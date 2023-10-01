import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    TreeNodeComponent
  ],
  exports: [
    TreeNodeComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class TreeModule { }

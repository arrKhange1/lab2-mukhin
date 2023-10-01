import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import {SharedModule} from "../shared/shared.module";
import { ResultPathComponent } from './result-path/result-path.component';



@NgModule({
  declarations: [
    TreeNodeComponent,
    ResultPathComponent
  ],
  exports: [
    TreeNodeComponent,
    ResultPathComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class TreeModule { }

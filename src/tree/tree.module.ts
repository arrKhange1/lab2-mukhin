import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNodeComponent } from './tree-node/tree-node.component';



@NgModule({
  declarations: [
    TreeNodeComponent
  ],
  exports: [
    TreeNodeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TreeModule { }

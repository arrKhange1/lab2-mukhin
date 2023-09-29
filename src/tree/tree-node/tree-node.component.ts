import {Component, Input} from '@angular/core';
import {StructuredNode} from "../../app/types";

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {
  @Input()
  public node?: StructuredNode;
}

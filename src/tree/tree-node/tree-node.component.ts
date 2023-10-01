import {Component, Input, OnInit} from '@angular/core';
import {isDefined, StructuredNode} from "../../app/types";

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  @Input()
  public node?: StructuredNode;
  public ngOnInit(): void {
  }
}

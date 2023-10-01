import {Component, Input} from '@angular/core';
import {StructuredNode} from "../../app/types";

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {
  @Input()
  public node?: StructuredNode;
}

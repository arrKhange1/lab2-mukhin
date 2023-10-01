import {Component, Input} from '@angular/core';
import {StructuredNode} from "../../app/types";

@Component({
  selector: 'app-result-path',
  templateUrl: './result-path.component.html',
  styleUrls: ['./result-path.component.css']
})
export class ResultPathComponent {
  @Input()
  public foundPath: StructuredNode[] = [];
}

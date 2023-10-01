import { Component } from '@angular/core';
import {MatricesService} from "./stores/matrices.service";

@Component({
  selector: 'app-find-path',
  templateUrl: './find-path.component.html',
  styleUrls: ['./find-path.component.css']
})
export class FindPathComponent {
  constructor(protected matricesService: MatricesService) {
  }
}

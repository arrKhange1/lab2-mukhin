import {Component, Input, OnInit} from '@angular/core';
import {MatricesService} from "../../find-path/stores/matrices.service";
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map} from "rxjs";

@Component({
  selector: 'app-matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.css', '../matrix/matrix.component.css']
})
export class MatrixInputComponent implements OnInit {

  @Input()
  public type?: 'initial' | 'finite';

  protected matrixInputForm?: FormGroup;

  constructor(private matricesService: MatricesService, private formBuilder: FormBuilder) {
  }
  public ngOnInit(): void {

    this.matrixInputForm = this.formBuilder.group({
      matrix: new FormArray(
        [1,2,3].map(row => new FormArray(
          [-1,-1,-1].map(cell=> new FormControl(cell))))
      )
    })

    this.matrixInputForm.valueChanges.pipe(
      map(form => form.matrix),
    ).subscribe((matrix: number[][]) => {
      if (this.type === 'initial') this.matricesService.matrices$.next({ ...this.matricesService.matrices$.getValue() ?? {}, initialMatrix: matrix })
      if (this.type === 'finite') this.matricesService.matrices$.next({ ...this.matricesService.matrices$.getValue() ?? {}, finiteMatrix: matrix })
    })

    if (this.type === 'initial') {
      this.matrixInputForm.setValue({matrix: [
          [2,4,3],
          [1,8,5],
          [7,-1,6],
        ]})
    }
    if (this.type === 'finite') {
      this.matrixInputForm.setValue({matrix: [
          [1,2,3],
          [4,5,6],
          [7,8,-1],
        ]})
    }
  }

  protected get matrix(): FormArray {
    return this.matrixInputForm?.controls['matrix'] as FormArray<FormArray>;
  }

  protected getFormArray(row: any): FormArray {
    return row as FormArray;
  }
}

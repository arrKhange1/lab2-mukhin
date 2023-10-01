import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Cell, isDefined, StructuredNode} from "./types";
import {MatricesService} from "../find-path/stores/matrices.service";
import {filter, map, switchMap, take, tap, withLatestFrom} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(protected matricesService: MatricesService) {
  }

  public ngOnInit() {
    // this.matricesService.findPathPressed$
    //   .pipe(
    //     withLatestFrom(this.matricesService.matrices$),
    //     map(([_, matrices]) => matrices),
    //     filter(isDefined),
    //     tap(matrices => this.matricesService.findTree(matrices)),
    //   )
    //   .subscribe()

    // ----- Раскомментируй, и все работает -----

    this.matricesService.findPathPressed$
      .pipe(
        withLatestFrom(this.matricesService.matrices$),
        map(([_, matrices]) => matrices),
        filter(isDefined),
        tap(matrices => this.matricesService.findPath(matrices)),
      )
      .subscribe();













    // let leafArray: StructuredNode[] = [];
    // let iMin = 0;
    // const initialState = [
    //   // [2, 1, 6],
    //   // [4, -1, 8],
    //   // [7, 5, 3],
    //   [2, 4, 3],
    //   [1, 8, 5],
    //   [7, -1, 6]
    // ];
    // const finiteState = [
    //   // [1, 2, 3],
    //   // [8, -1, 4],
    //   // [7, 6, 5],
    //   [1, 2, 3],
    //   [4, 5, 6],
    //   [7, 8, -1]
    // ];
    //
    // const constructedInitialMatrix = constructNode(
    //   initialState,
    //   finiteState,
    //   {
    //     x: 1,
    //     y: 1,
    //   },
    //   {
    //     x: 1,
    //     y: 1,
    //   },
    //   -1
    // );
    //
    // leafArray.push(constructedInitialMatrix);
    //
    // let g = constructedInitialMatrix.g;
    // let counter = 0;
    // while (leafArray[iMin].g) {
    //
    //   const minimalLeaf = leafArray[iMin];
    //   const minimalLeafChildren = constructChildrenNodes(
    //     minimalLeaf.matrix,
    //     finiteState,
    //     minimalLeaf.parentEmptyCell,
    //     minimalLeaf.currEmptyCell,
    //     minimalLeaf.h
    //   );
    //
    //   minimalLeaf.children = minimalLeafChildren;
    //
    //   minimalLeaf.is_path = true;
    //
    //   leafArray = removeElem(leafArray, iMin);
    //   leafArray = insertLeafsOnIndexTest(leafArray, minimalLeafChildren, iMin);
    //   iMin = findMinimalLeaf(leafArray);
    //   g = leafArray[iMin].g;
    // }
    //
    // leafArray[iMin].is_finish = true;
    // leafArray[iMin].is_path = true;
    //
    // this.rootNode = constructedInitialMatrix;
    //
    // console.log(constructedInitialMatrix);
    // const foundPath = findTreePath(constructedInitialMatrix);
    // console.log([constructedInitialMatrix, ...foundPath.slice(0, foundPath.length-1)], 'path');
  }
}

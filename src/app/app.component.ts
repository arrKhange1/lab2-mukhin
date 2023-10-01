import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Cell, isDefined, StructuredNode} from "./types";
import {MatricesService} from "../find-path/stores/matrices.service";
import {filter, map, switchMap, take, tap, withLatestFrom} from "rxjs";

function printMatrix(matrix: number[][]): void {
  matrix.forEach((arr) => {
    console.log(...arr);
  });
}

function compareMatrices(matrix1: number[][], matrix2: number[][]): number {
  let g = 0;
  for (let i = 0; i < matrix1.length; ++i) {
    for (let j = 0; j < matrix1[i].length; ++j) {
      if (matrix1[i][j] !== matrix2[i][j]) {
        ++g;
      }
    }
  }
  return g;
}

function createNewMatrix(
  oldCell: Cell,
  newCell: Cell,
  matrix: number[][]
): number[][] {
  const newMatrix = [...matrix].map((mat) => [...mat]);
  const tmp = matrix[oldCell.x][oldCell.y];
  newMatrix[oldCell.x][oldCell.y] = matrix[newCell.x][newCell.y];
  newMatrix[newCell.x][newCell.y] = tmp;
  return newMatrix;
}

function constructNode(
  matrix: number[][],
  finiteMatrix: number[][],
  currEmptyCell: Cell,
  newCurrEmptyCell: Cell,
  h: number
): StructuredNode {
  const newMatrix = createNewMatrix(currEmptyCell, newCurrEmptyCell, matrix);

  const newG = compareMatrices(newMatrix, finiteMatrix);
  const node: StructuredNode = {
    matrix: newMatrix,
    g: newG,
    h: h + 1,
    currEmptyCell: newCurrEmptyCell,
    parentEmptyCell: currEmptyCell,
    rate: newG + h + 1,
  };

  return node;
}

function constructChildrenNodes(
  matrix: number[][],
  finiteMatrix: number[][],
  parentEmptyCell: Cell,
  currEmptyCell: Cell,
  h: number
): StructuredNode[] {
  const nodes: StructuredNode[] = [];
  let newCurrEmptyCell = { x: currEmptyCell.x - 1, y: currEmptyCell.y };
  if (
    newCurrEmptyCell.x >= 0 &&
    (newCurrEmptyCell.x !== parentEmptyCell.x ||
      newCurrEmptyCell.y !== parentEmptyCell.y)
  ) {
    nodes.push(constructNode(matrix, finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
  }

  newCurrEmptyCell = { x: currEmptyCell.x, y: currEmptyCell.y + 1 };
  if (
    newCurrEmptyCell.y <= 2 &&
    (newCurrEmptyCell.x !== parentEmptyCell.x ||
      newCurrEmptyCell.y !== parentEmptyCell.y)
  ) {
    nodes.push(constructNode(matrix, finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
  }

  newCurrEmptyCell = { x: currEmptyCell.x + 1, y: currEmptyCell.y };
  if (
    newCurrEmptyCell.x <= 2 &&
    (newCurrEmptyCell.x !== parentEmptyCell.x ||
      newCurrEmptyCell.y !== parentEmptyCell.y)
  ) {
    nodes.push(constructNode(matrix, finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
  }

  newCurrEmptyCell = { x: currEmptyCell.x, y: currEmptyCell.y - 1 };
  if (
    newCurrEmptyCell.y >= 0 &&
    (newCurrEmptyCell.x !== parentEmptyCell.x ||
      newCurrEmptyCell.y !== parentEmptyCell.y)
  ) {
    nodes.push(constructNode(matrix,finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
  }
  return nodes;
}

function removeElem(
  leafArray: StructuredNode[],
  minIndex: number
): StructuredNode[] {
  return leafArray.filter((_, i) => i !== minIndex);
}

function insertLeafsOnIndex(
  originalLeafArr: StructuredNode[],
  leafArrToInsert: StructuredNode[],
  index: number
): StructuredNode[] {
  return originalLeafArr
    .slice(index - 1)
    .concat(leafArrToInsert)
    .concat(originalLeafArr.slice(index, originalLeafArr.length));
}

function insertLeafsOnIndexTest(
  originalLeafArr: any[],
  leafArrToInsert: any[],
  index: number
): any[] {
  const result = [];
  for (let i = 0; index !== 0 && i <= index - 1; ++i) {
    result.push(originalLeafArr[i]);
  }
  result.push(...leafArrToInsert);
  for (let i = index; i < originalLeafArr.length; ++i) {
    result.push(originalLeafArr[i]);
  }
  return result;
}

function findMinimalLeaf(leafArray: StructuredNode[]): number {
  let minRate = leafArray[0].rate;
  let minRateIndex = 0;
  leafArray.forEach((leaf, i) => {
    if (leaf.rate < minRate) {
      minRate = leaf.rate;
      minRateIndex = i;
    }
  });
  return minRateIndex;
}

function findTreePath(root: StructuredNode): StructuredNode[] {
  if (!root.children && root.is_finish) { root.is_result_path = true; return [root]; }
  if (root.children && root.children.length) {
    for (const node of root.children) {
      const currPath = findTreePath(node);
      if (currPath[0] && currPath[0].is_result_path) {
        node.is_result_path = true;
        return [node, ...currPath];
      }
    }
  }
  return [];
}

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
    this.matricesService.findPathPressed$
      .pipe(
        withLatestFrom(this.matricesService.matrices$),
        map(([_, matrices]) => matrices),
        filter(isDefined),
        tap(matrices => this.matricesService.findTree(matrices)),
      )
      .subscribe()















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

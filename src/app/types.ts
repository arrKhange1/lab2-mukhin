import {Matrices} from "../find-path/stores/matrices.service";

export interface Cell {
  x: number;
  y: number;
}

export interface StructuredNode {
  matrix: number[][];
  g: number;
  h: number;
  currEmptyCell: Cell;
  parentEmptyCell: Cell;
  rate: number;
  children?: StructuredNode[];
  parent?: StructuredNode;
  is_path?: boolean;
  is_finish?: boolean;
  is_result_path?: boolean;
  is_start?: boolean;
}

export function isDefined<T>(arg: T | null | undefined): arg is T extends null | undefined ? never : T {
  return arg !== null && arg !== undefined;
}

export class Tree {

  private foundPath: StructuredNode[] = [];
  public leafArray: StructuredNode[] = [];
  public iMin = 0;

  constructor(private initialMatrix: Matrices['initialMatrix'], private finiteMatrix: Matrices['finiteMatrix']) {
  }
  public printMatrix(matrix: number[][]): void {
    matrix.forEach((arr) => {
      console.log(...arr);
    });
  }

  private compareMatrices(matrix1: number[][], matrix2: number[][]): number {
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

  private createNewMatrix(
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

  public constructNode(
    matrix: number[][],
    finiteMatrix: number[][],
    currEmptyCell: Cell,
    newCurrEmptyCell: Cell,
    h: number
  ): StructuredNode {
    const newMatrix = this.createNewMatrix(currEmptyCell, newCurrEmptyCell, matrix);

    const newG = this.compareMatrices(newMatrix, finiteMatrix);
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

  public constructChildrenNodes(
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
      nodes.push(this.constructNode(matrix, finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
    }

    newCurrEmptyCell = { x: currEmptyCell.x, y: currEmptyCell.y + 1 };
    if (
      newCurrEmptyCell.y <= 2 &&
      (newCurrEmptyCell.x !== parentEmptyCell.x ||
        newCurrEmptyCell.y !== parentEmptyCell.y)
    ) {
      nodes.push(this.constructNode(matrix, finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
    }

    newCurrEmptyCell = { x: currEmptyCell.x + 1, y: currEmptyCell.y };
    if (
      newCurrEmptyCell.x <= 2 &&
      (newCurrEmptyCell.x !== parentEmptyCell.x ||
        newCurrEmptyCell.y !== parentEmptyCell.y)
    ) {
      nodes.push(this.constructNode(matrix, finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
    }

    newCurrEmptyCell = { x: currEmptyCell.x, y: currEmptyCell.y - 1 };
    if (
      newCurrEmptyCell.y >= 0 &&
      (newCurrEmptyCell.x !== parentEmptyCell.x ||
        newCurrEmptyCell.y !== parentEmptyCell.y)
    ) {
      nodes.push(this.constructNode(matrix,finiteMatrix, currEmptyCell, newCurrEmptyCell, h));
    }
    return nodes;
  }

  public removeElem(
    leafArray: StructuredNode[],
    minIndex: number
  ): StructuredNode[] {
    return leafArray.filter((_, i) => i !== minIndex);
  }

  public insertLeafsOnIndex(
    originalLeafArr: StructuredNode[],
    leafArrToInsert: StructuredNode[],
    index: number
  ): StructuredNode[] {
    return originalLeafArr
      .slice(index - 1)
      .concat(leafArrToInsert)
      .concat(originalLeafArr.slice(index, originalLeafArr.length));
  }

  public insertLeafsOnIndexTest(
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

  public findMinimalLeaf(leafArray: StructuredNode[]): number {
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

  public findTreePath(root: StructuredNode): StructuredNode[] {
    if (!root.children && root.is_finish) { root.is_result_path = true; return [root]; }
    if (root.children && root.children.length) {
      for (const node of root.children) {
        const currPath = this.findTreePath(node);
        if (currPath[0] && currPath[0].is_result_path) {
          node.is_result_path = true;
          return [node, ...currPath];
        }
      }
    }
    return [];
  }

  private findEmptyCell(matrix: number[][]): Cell {
    const emptyCellPos: Cell = { x: 2, y: 1 };
    matrix.forEach((row, emptyCellXIndex) => {
      const emptyCellYIndex = row.findIndex(num => num === -1);
      if (emptyCellYIndex !== -1) {
        emptyCellPos.x = emptyCellXIndex;
        emptyCellPos.y = emptyCellYIndex;
        return;
      }
    });
    return emptyCellPos;
  }

  public getTree(): StructuredNode | undefined {

    console.log('matrices:', this.initialMatrix, this.finiteMatrix)

    if (!this.initialMatrix || !this.finiteMatrix) return;

    const emptyCellIndex = this.findEmptyCell(this.initialMatrix);
    console.log(emptyCellIndex, 'empty cell')

    const constructedInitialMatrix = this.constructNode(
      this.initialMatrix,
      this.finiteMatrix,
      emptyCellIndex,
      emptyCellIndex,
      -1
    );

    this.leafArray.push(constructedInitialMatrix);

    let g = constructedInitialMatrix.g;
    let counter = 0;
    while (this.leafArray[this.iMin].g) {

      const minimalLeaf = this.leafArray[this.iMin];
      const minimalLeafChildren = this.constructChildrenNodes(
        minimalLeaf.matrix,
        this.finiteMatrix,
        minimalLeaf.parentEmptyCell,
        minimalLeaf.currEmptyCell,
        minimalLeaf.h
      );

      minimalLeaf.children = minimalLeafChildren;

      minimalLeaf.is_path = true;

      this.leafArray = this.removeElem(this.leafArray, this.iMin);
      this.leafArray = this.insertLeafsOnIndexTest(this.leafArray, minimalLeafChildren, this.iMin);
      this.iMin = this.findMinimalLeaf(this.leafArray);
      g = this.leafArray[this.iMin].g;
    }

    this.leafArray[this.iMin].is_finish = true;
    this.leafArray[this.iMin].is_path = true;

    this.foundPath = this.findTreePath(constructedInitialMatrix);

    constructedInitialMatrix.is_result_path = true;
    constructedInitialMatrix.is_start = true;
    return constructedInitialMatrix;
  }

  public findResultPath(): StructuredNode[] {
    const treeRoot = this.getTree();
    if (!treeRoot) return [];
    return [treeRoot, ...this.foundPath.slice(0, this.foundPath.length-1)];
    // [constructedInitialMatrix, ...foundPath.slice(0, foundPath.length-1)]
  }

}

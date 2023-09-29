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
  is_path?: boolean;
  is_finish?: boolean;
  is_result_path?: boolean;
}

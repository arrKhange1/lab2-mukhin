import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {StructuredNode, Tree} from "../../app/types";

export interface Matrices {
  initialMatrix?: StructuredNode['matrix'];
  finiteMatrix?: StructuredNode['matrix'];
}

@Injectable({
  providedIn: 'root'
})
export class MatricesService {

  public findPathPressed$ = new Subject<void>();
  public matrices$ = new BehaviorSubject<Matrices | undefined>(undefined);
  public foundTree$ = new BehaviorSubject<StructuredNode | undefined>(undefined);
  public fountPath$ = new BehaviorSubject<StructuredNode[]>([]);
  public findTree(matrices: Matrices): void {
    const tree = new Tree(matrices.initialMatrix, matrices.finiteMatrix);
    this.foundTree$.next(tree.getTree());
  }

  public findPath(matrices: Matrices): void {
    const tree = new Tree(matrices.initialMatrix, matrices.finiteMatrix);
    this.fountPath$.next(tree.findResultPath())
  }

  constructor() { }
}

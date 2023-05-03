import { IValue, IPriority } from "./common.ts";

export interface ISinglyNode<T> extends IValue<T> {
  next: ISinglyNode<T> | null;
}

export interface IDoublyNode<T> extends IValue<T> {
  prev: IDoublyNode<T> | null;
  next: IDoublyNode<T> | null;
}

export interface IPriorityDoublyNode<T> extends IValue<T>, IPriority {
  prev: IPriorityDoublyNode<T> | null;
  next: IPriorityDoublyNode<T> | null;
}

export interface ITripleNode<T> extends IValue<T> {
  parent: ITripleNode<T> | null;
  left: ITripleNode<T> | null;
  right: ITripleNode<T> | null;
}

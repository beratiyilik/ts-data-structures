import {
  ICollection,
  ISortable,
  ICollectionOperations,
} from "./common.ts";

interface ILinkedListBase<T> extends ISortable<T> {
  insertAtBeginning(value: T): boolean;
  insertAtEnd(value: T): boolean;
  insertAt(value: T, index: number): boolean;
  removeFromHead(): boolean;
  removeFromTail(): boolean;
  removeAt(index: number): boolean;
  reverse(): void;
}

export interface ILinkedList<T>
  extends ILinkedListBase<T>,
    ICollection<T>,
    ICollectionOperations<T> {
  get(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean
  ): T | null;
  remove(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean
  ): boolean;
  indexOf(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean
  ): number;
  traverseBackward(
    callback: (value: T, index: number, collection: ILinkedList<T>) => void
  ): void;
}

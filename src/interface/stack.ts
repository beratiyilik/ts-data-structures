import { ICollection, ICollectionOperations } from './common';

interface IStackBase<T> {
  push(data: T): boolean;
  pop(): T | null;
  peek(): T | null;
}

export interface IStack<T>
  extends IStackBase<T>,
    ICollection<T>,
    ICollectionOperations<T> {}

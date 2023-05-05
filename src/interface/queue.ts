import { ICollection, ICollectionOperations } from './common';

interface IQueueBase<T> {
  enqueue(value: T): boolean;
  dequeue(): T | null;
  peek(): T | null;
}

export interface IQueue<T>
  extends IQueueBase<T>,
    ICollection<T>,
    ICollectionOperations<T> {}

export interface IPriorityQueue<T> extends IQueue<T> {
  /* shadowed methods */
  enqueue(value: T, priority?: number): boolean;
  clone(): IPriorityQueue<T>;
  // equals(other: IPriorityQueue<T>, comparer?: (a: T, b: T) => boolean): boolean;
}

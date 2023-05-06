/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IQueue } from '../interface/index';
import { SinglyNode } from '../node/index';
import { deepClone } from '../util/index';

// FIFO: first-in-first-out
export default class Queue<T> implements IQueue<T> {
  protected head: SinglyNode<T> | null = null;
  protected tail: SinglyNode<T> | null = null;
  protected size: number = 0;
  protected capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  *[Symbol.iterator](): Iterator<T, any, undefined> {
    let current: SinglyNode<T> | null = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  *keys(): IterableIterator<number> {
    let index = 0;
    for (const _ of this) yield index++;
  }

  *values(): IterableIterator<T> {
    for (const value of this) yield value;
  }

  *entries(): IterableIterator<[number, T]> {
    let index = 0;
    for (const value of this) yield [index++, value];
  }

  enqueue(value: T): boolean {
    if (this.isFull()) return false;
    const newNode = new SinglyNode<T>(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return true;
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null;
    const dequeuedValue: T = this.head!.value;
    this.head = this.head!.next;
    this.size--;
    return dequeuedValue;
  }

  peek(): T | null {
    return this.head?.value || null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.capacity !== null && this.size >= this.capacity;
  }

  count(predicate?: (value: T) => boolean): number {
    if (!predicate) return this.size;
    return Array.from(this).filter(predicate).length;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  clone(): IQueue<T> {
    const clonedQueue = new Queue<T>(this.capacity);
    for (const value of this) clonedQueue.enqueue(deepClone(value));
    return clonedQueue;
  }

  equals(other: IQueue<T>, comparer?: (a: T, b: T) => boolean): boolean {
    if (this.size !== other.count()) return false;
    if (!comparer) comparer = (a, b) => a === b;

    const otherIterator = other[Symbol.iterator]();
    for (const thisValue of this) {
      const otherValue = otherIterator.next().value;
      if (!comparer(thisValue, otherValue)) return false;
    }

    return true;
  }

  toArray(): T[] {
    return Array.from(this);
  }

  toString(
    replacer?: (
      this: any,
      key: string,
      value: any,
    ) => any | (number | string)[] | null,
    space?: string | number,
  ): string {
    return JSON.stringify(this.toArray(), replacer, space);
  }

  forEach(
    callback: (value: T, index: number, collection: IQueue<T>) => void,
  ): void {
    let index = 0;
    for (const value of this) callback(value, index++, this);
  }

  map<U>(
    mapper: (value: T, index: number, collection: IQueue<T>) => U,
  ): IQueue<U> {
    const mappedQueue = new Queue<U>(this.capacity);
    this.forEach((value, index) => {
      mappedQueue.enqueue(mapper(value, index, this));
    });
    return mappedQueue;
  }

  filter(
    predicate: (value: T, index: number, collection: IQueue<T>) => boolean,
  ): IQueue<T> {
    const filteredQueue = new Queue<T>(this.capacity);
    this.forEach((value, index) => {
      if (predicate(value, index, this)) filteredQueue.enqueue(value);
    });
    return filteredQueue;
  }

  some(
    predicate: (value: T, index: number, collection: IQueue<T>) => boolean,
  ): boolean {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return true;
      index++;
    }
    return false;
  }

  every(
    predicate: (value: T, index: number, collection: IQueue<T>) => boolean,
  ): boolean {
    let index = 0;
    for (const value of this) {
      if (!predicate(value, index, this)) return false;
      index++;
    }
    return true;
  }

  reduce<U>(
    reducer: (
      accumulator: U,
      value: T,
      index: number,
      collection: IQueue<T>,
    ) => U,
    initialValue: U,
  ): U {
    let accumulator = initialValue;
    let index = 0;
    for (const value of this) {
      accumulator = reducer(accumulator, value, index, this);
      index++;
    }
    return accumulator;
  }

  find(
    predicate: (value: T, index: number, collection: IQueue<T>) => boolean,
  ): T {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return value;
      index++;
    }
    return null;
  }

  findIndex(
    predicate: (value: T, index: number, collection: IQueue<T>) => boolean,
  ): number {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return index;
      index++;
    }
    return -1;
  }
}

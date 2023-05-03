import { IStack } from "../interface/stack.ts";
import { SinglyNode } from "./../node/index.ts";
import { deepClone } from "./../util/index.ts";

// LIFO: last-in-first-out
export default class Stack<T> implements IStack<T> {
  private head: SinglyNode<T> | null = null;
  private size: number = 0;
  private capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  *[Symbol.iterator](): Iterator<T, any, undefined> {
    let current: SinglyNode<T> | null = this.head;
    if (!current) return;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  push(data: T): boolean {
    if (this.isFull()) return false;
    const newNode = new SinglyNode<T>(data, this.head);
    this.head = newNode;
    this.size++;
    return true;
  }

  pop(): T | null {
    if (this.isEmpty()) return null;
    const poppedNode = this.head;
    this.head = this.head?.next || null;
    this.size--;
    return poppedNode?.value || null;
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
    this.size = 0;
  }

  clone(): IStack<T> {
    const clonedStack = new Stack<T>(this.capacity);
    for (const value of this) clonedStack.push(deepClone(value));
    return clonedStack;
  }

  equals(other: IStack<T>, comparer?: (a: T, b: T) => boolean): boolean {
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
      value: any
    ) => any | (number | string)[] | null,
    space?: string | number
  ): string {
    return JSON.stringify(this.toArray(), replacer, space);
  }

  forEach(
    callback: (value: T, index: number, collection: IStack<T>) => void
  ): void {
    let index = 0;
    for (const value of this) {
      callback(value, index, this);
      index++;
    }
  }

  map<U>(
    mapper: (value: T, index: number, collection: IStack<T>) => U
  ): IStack<U> {
    const mappedStack = new Stack<U>(this.capacity);
    this.forEach((value, index) => {
      mappedStack.push(mapper(value, index, this));
    });
    return mappedStack;
  }

  filter(
    predicate: (value: T, index: number, collection: IStack<T>) => boolean
  ): IStack<T> {
    const filteredStack = new Stack<T>(this.capacity);
    this.forEach((value, index) => {
      if (predicate(value, index, this)) filteredStack.push(value);
    });
    return filteredStack;
  }

  some(
    predicate: (value: T, index: number, collection: IStack<T>) => boolean
  ): boolean {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return true;
      index++;
    }
    return false;
  }

  every(
    predicate: (value: T, index: number, collection: IStack<T>) => boolean
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
      collection: IStack<T>
    ) => U,
    initialValue: U
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
    predicate: (value: T, index: number, collection: IStack<T>) => boolean
  ): T {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return value;
      index++;
    }
    return null;
  }

  findIndex(
    predicate: (value: T, index: number, collection: IStack<T>) => boolean
  ): number {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return index;
      index++;
    }
    return -1;
  }
}

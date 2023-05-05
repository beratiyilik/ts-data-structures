/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ILinkedList } from '../interface/index';
import { DoublyNode } from './../node/index';
import { deepClone } from './../util/index';

export default class LinkedList<T> implements ILinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private size: number = 0;
  private capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  *[Symbol.iterator](): Iterator<T, any, undefined> {
    let current: DoublyNode<T> | null = this.head;
    if (!current) return;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  insertAtBeginning(value: T): boolean {
    if (this.isFull()) return false;

    const newNode = new DoublyNode<T>(value);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this.size++;
    return true;
  }

  insertAtEnd(value: T): boolean {
    if (this.isFull()) return false;

    const newNode = new DoublyNode<T>(value);
    if (this.tail) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.size++;
    return true;
  }

  insertAt(value: T, index: number): boolean {
    if (this.isFull() || index < 0 || index > this.size) return false;

    const newNode = new DoublyNode<T>(value);

    if (index === 0) {
      return this.insertAtBeginning(value);
    } else if (index === this.size) {
      return this.insertAtEnd(value);
    } else {
      let current: DoublyNode<T> | null = this.head;
      let i = 0;
      while (current && i < index - 1) {
        current = current.next;
        i++;
      }
      newNode.next = current.next;
      newNode.prev = current;
      current.next.prev = newNode;
      current.next = newNode;
      this.size++;
      return true;
    }
  }

  removeFromHead(): boolean {
    if (this.isEmpty()) return false;

    if (this.head) {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.size--;
      return true;
    }
    return false;
  }

  removeFromTail(): boolean {
    if (this.isEmpty()) return false;

    if (this.tail) {
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.size--;
      return true;
    }
    return false;
  }

  removeAt(index: number): boolean {
    if (index < 0 || index >= this.size) return false;

    if (index === 0) {
      return this.removeFromHead();
    } else if (index === this.size - 1) {
      return this.removeFromTail();
    } else {
      let current: DoublyNode<T> | null = this.head;
      let i = 0;
      while (current && i < index - 1) {
        current = current.next;
        i++;
      }
      current.next = current.next.next;
      current.next.prev = current;
      this.size--;
      return true;
    }
  }

  remove(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): boolean {
    let current: DoublyNode<T> | null = this.head;
    if (!current) return false;
    let index = 0;
    let removed = false;

    while (current) {
      if (predicate(current.value, index, this)) {
        if (index === 0) {
          this.removeFromHead();
        } else if (index === this.size - 1) {
          this.removeFromTail();
        } else {
          if (current.prev) {
            current.prev.next = current.next;
          }
          if (current.next) {
            current.next.prev = current.prev;
          }
          this.size--;
        }
        removed = true;
        break;
      }
      current = current.next;
      index++;
    }
    return removed;
  }

  reverse(): void {
    let current = this.head;
    let temp: DoublyNode<T> | null = null;

    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }

    if (temp) {
      this.tail = this.head;
      this.head = temp.prev;
    }
  }

  get(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): T | null {
    let current: DoublyNode<T> | null = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) {
        return current.value;
      }
      current = current.next;
      index++;
    }
    return null;
  }

  indexOf(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): number {
    let current: DoublyNode<T> | null = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  traverseBackward(
    callback: (value: T, index: number, collection: ILinkedList<T>) => void,
  ): void {
    let current: DoublyNode<T> | null = this.tail;
    if (!current) return;
    let index = this.size - 1;
    while (current) {
      callback(current.value, index--, this);
      current = current.prev;
    }
  }

  clone(): ILinkedList<T> {
    const newList = new LinkedList<T>(this.capacity);
    for (const value of this) newList.insertAtEnd(deepClone(value));
    return newList;
  }

  count(predicate?: (value: T) => boolean): number {
    if (!predicate) return this.size;
    return Array.from(this).filter(predicate).length;
  }

  equals(other: ILinkedList<T>, comparer?: (a: T, b: T) => boolean): boolean {
    if (this.size !== other.count()) return false;
    if (!comparer) comparer = (a, b) => a === b;

    const otherIterator = other[Symbol.iterator]();
    for (const value of this) {
      const otherValue = otherIterator.next().value;
      if (!comparer(value, otherValue)) return false;
    }

    return true;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.capacity !== null && this.size >= this.capacity;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
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
    callback: (value: T, index: number, collection: ILinkedList<T>) => void,
  ): void {
    let index = 0;
    for (const value of this) callback(value, index++, this);
  }

  map<U>(
    mapper: (value: T, index: number, collection: ILinkedList<T>) => U,
  ): ILinkedList<U> {
    const mappedLinkedList = new LinkedList<U>(this.capacity);
    this.forEach((value, index) =>
      mappedLinkedList.insertAtEnd(mapper(value, index, this)),
    );
    return mappedLinkedList;
  }

  filter(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): LinkedList<T> {
    const filteredLinkedList = new LinkedList<T>(this.capacity);
    this.forEach((value, index) => {
      if (predicate(value, index, this)) filteredLinkedList.insertAtEnd(value);
    });
    return filteredLinkedList;
  }

  some(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): boolean {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return true;
      index++;
    }
    return false;
  }

  every(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
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
      collection: ILinkedList<T>,
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
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): T {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return value;
      index++;
    }
    return null;
  }

  findIndex(
    predicate: (value: T, index: number, collection: ILinkedList<T>) => boolean,
  ): number {
    let index = 0;
    for (const value of this) {
      if (predicate(value, index, this)) return index;
      index++;
    }
    return -1;
  }

  sort(comparer?: (a: T, b: T) => number): void {
    if (this.size <= 1) return;

    if (!comparer)
      comparer = (a: T, b: T): number => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

    const arr = this.toArray();
    arr.sort(comparer);

    this.clear();
    for (const value of arr) this.insertAtEnd(value);
  }
}

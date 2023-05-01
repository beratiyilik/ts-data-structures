import { DoublyNode } from "./../node/index.ts";
import { deepClone } from "./../util.ts";

export default class LinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private size: number = 0;
  private capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  append(value: T): boolean {
    if (this.capacity !== null && this.size >= this.capacity) return false;

    const newNode = new DoublyNode(value, this.tail, null);
    if (this.tail) this.tail.next = newNode;

    this.tail = newNode;

    if (!this.head) this.head = newNode;

    this.size++;
    return true;
  }

  appendAll(values: Iterable<T>): boolean {
    const valuesArray = Array.from(values);

    if (
      this.capacity !== null &&
      this.size + valuesArray.length > this.capacity
    )
      return false;

    for (const value of valuesArray) {
      this.append(value);
    }
    return true;
  }

  prepend(value: T): boolean {
    if (this.capacity !== null && this.size >= this.capacity) return false;

    const newNode = new DoublyNode(value, null, this.head);
    if (this.head) this.head.prev = newNode;
    this.head = newNode;

    if (!this.tail) this.tail = newNode;

    this.size++;
    return true;
  }

  prependAll(values: Iterable<T>): boolean {
    const valuesArray = Array.from(values);

    if (
      this.capacity !== null &&
      this.size + valuesArray.length > this.capacity
    )
      return false;

    const reversedValues = valuesArray.reverse();
    for (const value of reversedValues) {
      this.prepend(value);
    }
    return true;
  }

  insertAt(index: number, value: T): boolean {
    if (index < 0 || index > this.size) return false;

    if (index === 0) return this.prepend(value);

    if (index === this.size) return this.append(value);

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (!current) return false;
      current = current.next;
    }

    const newNode = new DoublyNode(value, current, current.next);
    if (current.next) current.next.prev = newNode;
    current.next = newNode;

    this.size++;
    return true;
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.size) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) return null;
      current = current.next;
    }

    return current ? current.value : null;
  }

  remove(
    predicate: (value: T, index: number, list: LinkedList<T>) => boolean
  ): boolean {
    let current = this.head;
    let index = 0;

    while (current) {
      if (predicate(current.value, index, this)) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.size--;
        return true;
      }
      current = current.next;
      index++;
    }
    return false;
  }

  removeAt(index: number): boolean {
    if (index < 0 || index >= this.size) return false;

    if (index === 0) {
      this.head = this.head!.next;
      if (this.head) this.head.prev = null;
      this.size--;
      return true;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) return false;
      current = current.next;
    }

    if (current.prev) current.prev.next = current.next;
    if (current.next) current.next.prev = current.prev;
    this.size--;

    return true;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.capacity !== null && this.size === this.capacity;
  }

  count(
    predicate?: (value: T, index: number, list: LinkedList<T>) => boolean
  ): number {
    if (!predicate) return this.size;

    let count = 0;
    let current = this.head;
    let index = 0;

    while (current) {
      if (predicate(current.value, index, this)) count++;

      current = current.next;
      index++;
    }

    return count;
  }

  clear(): void {
    let current = this.head;
    while (current) {
      const nextNode = current.next;
      current.next = null;
      current.prev = null;
      current = nextNode;
    }
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  reverse(): LinkedList<T> {
    let current = this.head;
    let prev: DoublyNode<T> | null = null;

    while (current) {
      const next = current.next;
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }

    [this.head, this.tail] = [this.tail, this.head];
    return this;
  }

  clone(): LinkedList<T> {
    const clonedList = new LinkedList<T>(<number>this.capacity);

    let current = this.head;
    while (current) {
      clonedList.append(deepClone(current.value));
      current = current.next;
    }

    return clonedList;
  }

  equals(
    otherLinkedList: LinkedList<T>,
    compareFunction?: (a: T, b: T) => boolean
  ): boolean {
    if (this.size !== otherLinkedList.size) return false;

    const defaultCompareFunction = (a: T, b: T) => a === b;
    const compare = compareFunction || defaultCompareFunction;

    let thisCurrent = this.head;
    let otherCurrent = otherLinkedList.head;

    while (thisCurrent && otherCurrent) {
      if (!compare(thisCurrent.value, otherCurrent.value)) return false;

      thisCurrent = thisCurrent.next;
      otherCurrent = otherCurrent.next;
    }

    return true;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current: DoublyNode<T> | null = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  toString(): string {
    return this.toArray().toString();
  }

  forEach(
    callback: (value: T, index: number, list: LinkedList<T>) => void
  ): void {
    let current = this.head;
    let index = 0;
    while (current) {
      callback(current.value, index, this);
      current = current.next;
      index++;
    }
  }

  map<U>(
    mapper: (value: T, index: number, list: LinkedList<T>) => U
  ): LinkedList<U> {
    const newList = new LinkedList<U>(<number>this.capacity);
    let current = this.head;
    let index = 0;
    while (current) {
      newList.append(mapper(current.value, index, this));
      current = current.next;
      index++;
    }
    return newList;
  }

  filter(
    predicate: (value: T, index: number, list: LinkedList<T>) => boolean
  ): LinkedList<T> {
    const newList = new LinkedList<T>(<number>this.capacity);
    let current = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) newList.append(current.value);

      current = current.next;
      index++;
    }
    return newList;
  }

  some(
    predicate: (value: T, index: number, list: LinkedList<T>) => boolean
  ): boolean {
    let current = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) return true;

      current = current.next;
      index++;
    }
    return false;
  }

  every(
    predicate: (value: T, index: number, list: LinkedList<T>) => boolean
  ): boolean {
    let current = this.head;
    let index = 0;
    while (current) {
      if (!predicate(current.value, index, this)) return false;

      current = current.next;
      index++;
    }
    return true;
  }

  reduce<U>(
    reducer: (
      accumulator: U,
      value: T,
      index: number,
      list: LinkedList<T>
    ) => U,
    initialValue: U
  ): U {
    let accumulator = initialValue;
    let current = this.head;
    let index = 0;
    while (current) {
      accumulator = reducer(accumulator, current.value, index, this);
      current = current.next;
      index++;
    }
    return accumulator;
  }

  find(
    predicate: (value: T, index: number, list: LinkedList<T>) => boolean
  ): T | null {
    let current = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) return current.value;

      current = current.next;
      index++;
    }
    return null;
  }

  findIndex(
    predicate: (value: T, index: number, list: LinkedList<T>) => boolean
  ): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (predicate(current.value, index, this)) return index;

      current = current.next;
      index++;
    }
    return -1;
  }
}

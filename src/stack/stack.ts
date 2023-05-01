import { SinglyNode } from "./../node/index.ts";
import { deepClone } from "./../util.ts";

// stack last-in-first-out LIFO
export default class Stack<T> {
  private head: SinglyNode<T> | null = null;
  private size: number = 0;
  private capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  push(value: T): boolean {
    if (this.isFull()) return false;

    const newNode = new SinglyNode<T>(value, this.head);
    this.head = newNode;
    this.size++;
    return true;
  }

  pushAll(values: Iterable<T>): boolean {
    const valuesArray = Array.from(values);
    if (
      this.capacity !== null &&
      this.size + valuesArray.length > this.capacity
    )
      return false;

    for (const value of valuesArray) this.push(value);

    return true;
  }

  pop(): T | null {
    if (this.isEmpty()) return null;

    const removedNode = this.head!;
    this.head = this.head!.next;
    this.size--;

    return removedNode.value;
  }

  peek(): T | null {
    return this.head ? this.head.value : null;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.capacity !== null && this.size === this.capacity;
  }

  count(predicate?: (value: T) => boolean): number {
    if (!predicate) return this.size;

    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (predicate(currentNode.value)) {
        count++;
      }
      currentNode = currentNode.next;
    }
    return count;
  }

  clear(): void {
    let currentNode = this.head;

    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.next = null;
      currentNode = nextNode;
    }

    this.head = null;
    this.size = 0;
  }

  clone(): Stack<T> {
    const clonedStack = new Stack<T>(<number>this.capacity);
    let currentNode = this.head;

    while (currentNode) {
      clonedStack.push(deepClone(currentNode.value));
      currentNode = currentNode.next;
    }

    return clonedStack;
  }

  equals(
    otherStack: Stack<T>,
    compareFunction?: (a: T, b: T) => boolean
  ): boolean {
    if (this.size !== otherStack.size) return false;

    const defaultCompareFunction = (a: T, b: T) => a === b;
    const compare = compareFunction || defaultCompareFunction;

    let currentNodeA = this.head;
    let currentNodeB = otherStack.head;

    while (currentNodeA && currentNodeB) {
      if (!compare(currentNodeA.value, currentNodeB.value)) {
        return false;
      }
      currentNodeA = currentNodeA.next;
      currentNodeB = currentNodeB.next;
    }

    return true;
  }

  toArray(): T[] {
    const result: T[] = [];
    let currentNode = this.head;

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result;
  }

  toString(): string {
    return this.toArray().toString();
  }

  forEach(callback: (value: T, index: number, stack: Stack<T>) => void): void {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      callback(currentNode.value, index, this);
      currentNode = currentNode.next;
      index++;
    }
  }

  map<U>(mapper: (value: T, index: number, stack: Stack<T>) => U): Stack<U> {
    const mappedStack = new Stack<U>(<number>this.capacity);
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      mappedStack.push(mapper(currentNode.value, index, this));
      currentNode = currentNode.next;
      index++;
    }

    return mappedStack;
  }

  filter(
    predicate: (value: T, index: number, stack: Stack<T>) => boolean
  ): Stack<T> {
    const filteredStack = new Stack<T>(<number>this.capacity);
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index, this)) {
        filteredStack.push(currentNode.value);
      }
      currentNode = currentNode.next;
      index++;
    }

    return filteredStack;
  }

  some(
    predicate: (value: T, index: number, stack: Stack<T>) => boolean
  ): boolean {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index, this)) {
        return true;
      }
      currentNode = currentNode.next;
      index++;
    }

    return false;
  }

  every(
    predicate: (value: T, index: number, stack: Stack<T>) => boolean
  ): boolean {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (!predicate(currentNode.value, index, this)) {
        return false;
      }
      currentNode = currentNode.next;
      index++;
    }

    return true;
  }

  reduce<U>(
    reducer: (accumulator: U, value: T, index: number, stack: Stack<T>) => U,
    initialValue: U
  ): U {
    let currentNode = this.head;
    let accumulator = initialValue;
    let index = 0;

    while (currentNode) {
      accumulator = reducer(accumulator, currentNode.value, index, this);
      currentNode = currentNode.next;
      index++;
    }

    return accumulator;
  }

  find(
    predicate: (value: T, index: number, stack: Stack<T>) => boolean
  ): T | null {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index, this)) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      index++;
    }

    return null;
  }

  findIndex(
    predicate: (value: T, index: number, stack: Stack<T>) => boolean
  ): number {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (predicate(currentNode.value, index, this)) {
        return index;
      }
      currentNode = currentNode.next;
      index++;
    }

    return -1;
  }
}

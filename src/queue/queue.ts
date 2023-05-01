import { SinglyNode } from "../node/index.ts";
import { deepClone } from "../util.ts";

// queue first-in-first-out FIFO
export default class Queue<T> {
  private head: SinglyNode<T> | null = null;
  private tail: SinglyNode<T> | null = null;
  private size: number = 0;
  private capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  enqueue(value: T): boolean {
    if (this.isFull()) return false;

    const node = new SinglyNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
    return true;
  }

  enqueueAll(values: Iterable<T>): boolean {
    const valuesArray = Array.from(values);
    if (
      this.capacity !== null &&
      this.size + valuesArray.length > this.capacity
    )
      return false;

    for (const value of valuesArray) this.enqueue(value);

    return true;
  }

  dequeue(): T | null {
    if (this.head === null) return null;

    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) this.tail = null;

    this.size--;
    return value;
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
    this.tail = null;
    this.size = 0;
  }

  clone(): Queue<T> {
    const clonedQueue = new Queue<T>(<number>this.capacity);

    let currentNode = this.head;
    while (currentNode) {
      clonedQueue.enqueue(deepClone(currentNode.value));
      currentNode = currentNode.next;
    }

    return clonedQueue;
  }

  equals(
    otherQueue: Queue<T>,
    compareFunction?: (a: T, b: T) => boolean
  ): boolean {
    if (this.size !== otherQueue.count()) return false;

    if (!compareFunction) compareFunction = (a: T, b: T) => a === b;

    let thisNode = this.head;
    let otherNode = otherQueue.head;
    while (thisNode && otherNode) {
      if (!compareFunction(thisNode.value, otherNode.value)) return false;

      thisNode = thisNode.next;
      otherNode = otherNode.next;
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

  forEach(callback: (value: T, index: number, queue: Queue<T>) => void): void {
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      callback(currentNode.value, index, this);
      currentNode = currentNode.next;
      index++;
    }
  }

  map<U>(mapper: (value: T, index: number, queue: Queue<T>) => U): Queue<U> {
    const mappedQueue = new Queue<U>();
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      mappedQueue.enqueue(mapper(currentNode.value, index, this));
      currentNode = currentNode.next;
      index++;
    }
    return mappedQueue;
  }

  filter(
    predicate: (value: T, index: number, queue: Queue<T>) => boolean
  ): Queue<T> {
    const filteredQueue = new Queue<T>();
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (predicate(currentNode.value, index, this))
        filteredQueue.enqueue(currentNode.value);

      currentNode = currentNode.next;
      index++;
    }
    return filteredQueue;
  }

  some(
    predicate: (value: T, index: number, queue: Queue<T>) => boolean
  ): boolean {
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (predicate(currentNode.value, index, this)) return true;

      currentNode = currentNode.next;
      index++;
    }
    return false;
  }

  every(
    predicate: (value: T, index: number, queue: Queue<T>) => boolean
  ): boolean {
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (!predicate(currentNode.value, index, this)) return false;

      currentNode = currentNode.next;
      index++;
    }
    return true;
  }

  reduce<U>(
    reducer: (accumulator: U, value: T, index: number, queue: Queue<T>) => U,
    initialValue: U
  ): U {
    let accumulator = initialValue;
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      accumulator = reducer(accumulator, currentNode.value, index, this);
      currentNode = currentNode.next;
      index++;
    }
    return accumulator;
  }

  find(
    predicate: (value: T, index: number, queue: Queue<T>) => boolean
  ): T | null {
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (predicate(currentNode.value, index, this)) return currentNode.value;

      currentNode = currentNode.next;
      index++;
    }
    return null;
  }

  findIndex(
    predicate: (value: T, index: number, queue: Queue<T>) => boolean
  ): number {
    let index = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (predicate(currentNode.value, index, this)) return index;

      currentNode = currentNode.next;
      index++;
    }
    return -1;
  }
}

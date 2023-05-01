import { PriorityDoublyNode } from './../node/index.ts';
import { deepClone } from './../util.ts';

// priority queue
export default class PriorityQueue<T> {
  private head: PriorityDoublyNode<T> | null = null;
  private tail: PriorityDoublyNode<T> | null = null;
  private size: number = 0;
  private capacity: number | null = null;

  constructor();
  constructor(capacity: number);
  constructor(capacity?: number) {
    if (capacity) this.capacity = capacity;
  }

  enqueue(value: T, priority: number): boolean {
    if (this.isFull()) return false;

    const newNode = new PriorityDoublyNode<T>(value, priority);

    if (!this.head || priority < this.head.priority) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next && priority >= currentNode.next.priority) {
        currentNode = currentNode.next;
      }

      newNode.next = currentNode.next;
      newNode.prev = currentNode;
      currentNode.next = newNode;

      if (newNode.next) {
        newNode.next.prev = newNode;
      } else {
        this.tail = newNode;
      }
    }

    this.size++;
    return true;
  }

  dequeue(): T | null {
    if (!this.head) return null;

    const dequeuedValue = this.head.value;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size--;
    return dequeuedValue;
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

  clone(): PriorityQueue<T> {
    const newQueue = new PriorityQueue<T>(<number>this.capacity);
    let currentNode = this.head;
    while (currentNode) {
      newQueue.enqueue(deepClone(currentNode.value), currentNode.priority);
      currentNode = currentNode.next;
    }
    return newQueue;
  }

  equals(
    otherQueue: PriorityQueue<T>,
    compareFunction?: (a: T, b: T) => boolean
  ): boolean {
    if (this.size !== otherQueue.size) return false;

    if (!compareFunction) compareFunction = (a: T, b: T) => a === b;

    let thisNode = this.head;
    let otherNode = otherQueue.head;
    while (thisNode && otherNode) {
      if (
        !compareFunction(thisNode.value, otherNode.value) ||
        thisNode.priority !== otherNode.priority
      )
        return false;

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

  forEach(
    callback: (value: T, index: number, queue: PriorityQueue<T>) => void
  ): void {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      callback(currentNode.value, index, this);
      currentNode = currentNode.next;
      index++;
    }
  }

  map<U>(mapper: (value: T, index: number, queue: PriorityQueue<T>) => U): U[] {
    const result: U[] = [];
    this.forEach((value, index) => {
      result.push(mapper(value, index, this));
    });
    return result;
  }

  filter(
    predicate: (value: T, index: number, queue: PriorityQueue<T>) => boolean
  ): T[] {
    const result: T[] = [];
    this.forEach((value, index) => {
      if (predicate(value, index, this)) {
        result.push(value);
      }
    });
    return result;
  }

  some(
    predicate: (value: T, index: number, queue: PriorityQueue<T>) => boolean
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
    predicate: (value: T, index: number, queue: PriorityQueue<T>) => boolean
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
    reducer: (
      accumulator: U,
      value: T,
      index: number,
      queue: PriorityQueue<T>
    ) => U,
    initialValue: U
  ): U {
    let accumulator = initialValue;
    this.forEach((value, index) => {
      accumulator = reducer(accumulator, value, index, this);
    });
    return accumulator;
  }

  find(
    predicate: (value: T, index: number, queue: PriorityQueue<T>) => boolean
  ): T | undefined {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (predicate(currentNode.value, index, this)) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      index++;
    }
    return undefined;
  }

  findIndex(
    predicate: (value: T, index: number, queue: PriorityQueue<T>) => boolean
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

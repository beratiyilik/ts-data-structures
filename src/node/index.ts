import {
  IDoublyNode,
  IPriorityDoublyNode,
  ISinglyNode,
  ITripleNode,
} from "../interface/node.ts";

export class SinglyNode<T> implements ISinglyNode<T> {
  value: T;
  next: SinglyNode<T> | null;

  constructor(value: T, next: SinglyNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class DoublyNode<T> implements IDoublyNode<T> {
  value: T;
  prev: DoublyNode<T> | null;
  next: DoublyNode<T> | null;

  constructor(
    value: T,
    prev: DoublyNode<T> | null = null,
    next: DoublyNode<T> | null = null
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class PriorityDoublyNode<T> implements IPriorityDoublyNode<T> {
  value: T;
  priority: number;
  prev: PriorityDoublyNode<T> | null;
  next: PriorityDoublyNode<T> | null;

  constructor(
    value: T,
    priority: number,
    prev: PriorityDoublyNode<T> | null = null,
    next: PriorityDoublyNode<T> | null = null
  ) {
    this.value = value;
    this.priority = priority;
    this.prev = prev;
    this.next = next;
  }
}

export class TripleNode<T> implements ITripleNode<T> {
  value: T;
  parent: TripleNode<T> | null;
  left: TripleNode<T> | null;
  right: TripleNode<T> | null;

  constructor(
    value: T,
    parent: TripleNode<T> | null = null,
    left: TripleNode<T> | null = null,
    right: TripleNode<T> | null = null
  ) {
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

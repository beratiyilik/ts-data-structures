import { IPriorityQueue } from "../interface/index.ts";
import { PriorityDoublyNode } from "./../node/index.ts";
import { deepClone } from "./../util/index.ts";
import { Queue } from "./index.ts";

// priority queue
export default class PriorityQueue<T>
  extends Queue<T>
  implements IPriorityQueue<T>
{
  protected head: PriorityDoublyNode<T> | null = null;
  protected tail: PriorityDoublyNode<T> | null = null;

  constructor(capacity?: number) {
    super(capacity);
  }

  enqueue(value: T, priority?: number): boolean {
    if (this.isFull()) return false;
    const newNode = new PriorityDoublyNode<T>(value, priority);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let current = this.head;
      let previous: PriorityDoublyNode<T> | null = null;

      while (current && priority < current.priority) {
        previous = current;
        current = current.next;
      }

      if (!previous) {
        newNode.next = this.head;
        this.head = newNode;
      } else if (!current) {
        previous.next = newNode;
        this.tail = newNode;
      } else {
        previous.next = newNode;
        newNode.next = current;
      }
    }
    this.size++;
    return true;
  }

  clone(): IPriorityQueue<T> {
    const clonedQueue = new PriorityQueue<T>(this.capacity);
    let current: PriorityDoublyNode<T> | null = this.head;
    while (current) {
      clonedQueue.enqueue(deepClone(current.value), current.priority);
      current = current.next;
    }
    return clonedQueue;
  }
}

import { ILinkedList, IQueue, IStack } from './../interface/index';
import { LinkedList } from './../linked-list/index';
import { Queue } from './../queue/index';
import { Stack } from './../stack/index';

export default class Parser {
  private static validateParsedArray(parsedArray: any[]): boolean {
    return Array.isArray(parsedArray) && parsedArray.length > 0;
  }

  public static parseToStack<T>(
    text: string,
    reviver?: (key: string, value: any) => any,
    constructItem?: (item: any) => T,
  ): IStack<T> | null {
    const parsedArray = JSON.parse(text, reviver);

    if (!this.validateParsedArray(parsedArray)) return null;

    const stack = new Stack<T>();

    for (const item of parsedArray) {
      const value = constructItem ? constructItem(item) : item;
      stack.push(value);
    }

    return stack;
  }

  public static parseToQueue<T>(
    text: string,
    reviver?: (key: string, value: any) => any,
    constructItem?: (item: any) => T,
  ): IQueue<T> | null {
    const parsedArray = JSON.parse(text, reviver);

    if (!this.validateParsedArray(parsedArray)) return null;

    const queue = new Queue<T>();

    for (const item of parsedArray) {
      const value = constructItem ? constructItem(item) : item;
      queue.enqueue(value);
    }
    return queue;
  }

  public static parseToLinkedList<T>(
    text: string,
    reviver?: (key: string, value: any) => any,
    constructItem?: (item: any) => T,
  ): ILinkedList<T> {
    const parsedArray = JSON.parse(text, reviver);

    if (!this.validateParsedArray(parsedArray)) return null;

    const linkedList = new LinkedList<T>();

    for (const item of parsedArray) {
      const value = constructItem ? constructItem(item) : item;
      linkedList.insertAtEnd(value);
    }
    return linkedList;
  }
}

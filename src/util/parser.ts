import {
  ILinkedList,
  IQueue,
  IStack,
  ParserOptions,
} from "./../interface/index.ts";
import { LinkedList } from "./../linked-list/index.ts";
import { Queue } from "./../queue/index.ts";
import { Stack } from "./../stack/index.ts";

export default class Parser {
  private static validateParsedArray(parsedArray: any[]): boolean {
    return Array.isArray(parsedArray) && parsedArray.length > 0;
  }

  private static parseItems<T>(
    parsedArray: any[],
    options?: ParserOptions<T>
  ): T[] {
    const items: T[] = [];

    for (const item of parsedArray) {
      const value = options?.constructItem ? options.constructItem(item) : item;
      items.push(value);
    }

    return items;
  }

  public static toStack<T>(
    text: string,
    options?: ParserOptions<T>
  ): IStack<T> | null {
    const parsedArray = JSON.parse(text, options?.reviver);

    if (!this.validateParsedArray(parsedArray)) return null;

    const items = Parser.parseItems<T>(parsedArray, options);

    const stack = new Stack<T>();

    for (const item of items) {
      const value = options?.constructItem ? options.constructItem(item) : item;
      stack.push(value);
    }
    return stack;
  }

  public static toQueue<T>(
    text: string,
    options?: ParserOptions<T>
  ): IQueue<T> | null {
    const parsedArray = JSON.parse(text, options?.reviver);

    if (!this.validateParsedArray(parsedArray)) return null;

    const items = Parser.parseItems<T>(parsedArray, options);

    const queue = new Queue<T>();

    for (const item of items) {
      const value = options?.constructItem ? options.constructItem(item) : item;
      queue.enqueue(value);
    }
    return queue;
  }

  public static toLinkedList<T>(
    text: string,
    options?: ParserOptions<T>
  ): ILinkedList<T> {
    const parsedArray = JSON.parse(text, options?.reviver);

    if (!this.validateParsedArray(parsedArray)) return null;

    const items = Parser.parseItems<T>(parsedArray, options);

    const linkedList = new LinkedList<T>();

    for (const item of items) {
      const value = options?.constructItem ? options.constructItem(item) : item;
      linkedList.insertAtEnd(value);
    }
    return linkedList;
  }
}

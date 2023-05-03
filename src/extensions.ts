import { IStack, IQueue, ILinkedList } from "./interface/index.ts";
import { Parser } from "./util/index.ts";

declare global {
  interface JSON {
    parseToStack<T>(
      text: string,
      reviver?: (key: string, value: any) => any,
      constructItem?: (item: any) => T
    ): IStack<T> | null;

    parseToQueue<T>(
      text: string,
      reviver?: (key: string, value: any) => any,
      constructItem?: (item: any) => T
    ): IQueue<T> | null;

    parseToLinkedList<T>(
      text: string,
      reviver?: (key: string, value: any) => any,
      constructItem?: (item: any) => T
    ): ILinkedList<T> | null;
  }
}

JSON.parseToStack = function <T>(
  text: string,
  reviver?: (key: string, value: any) => any,
  constructItem?: (item: any) => T
): IStack<T> | null {
  return Parser.parseToStack<T>(text, reviver, constructItem);
};

JSON.parseToQueue = function <T>(
  text: string,
  reviver?: (key: string, value: any) => any,
  constructItem?: (item: any) => T
): IQueue<T> | null {
  return Parser.parseToQueue<T>(text, reviver, constructItem);
};

JSON.parseToLinkedList = function <T>(
  text: string,
  reviver?: (key: string, value: any) => any,
  constructItem?: (item: any) => T
): ILinkedList<T> | null {
  return Parser.parseToLinkedList<T>(text, reviver, constructItem);
};

export {};

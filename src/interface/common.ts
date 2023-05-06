export interface IValue<ValueType> {
  value: ValueType;
}

export interface Iterable<T> {
  [Symbol.iterator](): Iterator<T, any, undefined>;
}

export interface IKeys<KeyType> {
  keys(): IterableIterator<KeyType>;
}

export interface IValues<T> {
  values(): IterableIterator<T>;
}

export interface IEntries<KeyType, ValueType> {
  entries(): IterableIterator<[KeyType, ValueType]>;
}

export interface IPriority {
  priority: number;
}

export interface ICloneable<T> {
  clone(): T;
}

export interface IComparable<ValueType, CollectionType> {
  equals(
    other: CollectionType,
    comparer?: (a: ValueType, b: ValueType) => boolean,
  ): boolean;
}

export interface IStringifiable {
  toString(
    replacer?: (
      this: any,
      key: string,
      value: any,
    ) => any | (number | string)[] | null,
    space?: string | number,
  ): string;
}

export interface ICollection<T>
  extends Iterable<T>,
    IKeys<number>,
    IValues<T>,
    IEntries<number, T>,
    ICloneable<ICollection<T>>,
    IComparable<T, ICollection<T>>,
    IStringifiable {
  count(predicate?: (value: T) => boolean): number;
  clear(): void;
  isEmpty(): boolean;
  isFull(): boolean;
  toArray(): T[];
  forEach(
    callback: (value: T, index: number, collection: ICollection<T>) => void,
  ): void;
}

export interface ICollectionOperations<T> {
  map<U>(
    mapper: (value: T, index: number, collection: ICollection<T>) => U,
  ): ICollection<U>;
  filter(
    predicate: (value: T, index: number, collection: ICollection<T>) => boolean,
  ): ICollection<T>;
  some(
    predicate: (value: T, index: number, collection: ICollection<T>) => boolean,
  ): boolean;
  every(
    predicate: (value: T, index: number, collection: ICollection<T>) => boolean,
  ): boolean;
  reduce<U>(
    reducer: (
      accumulator: U,
      value: T,
      index: number,
      collection: ICollection<T>,
    ) => U,
    initialValue: U,
  ): U;
  find(
    predicate: (value: T, index: number, collection: ICollection<T>) => boolean,
  ): T | null;
  findIndex(
    predicate: (value: T, index: number, collection: ICollection<T>) => boolean,
  ): number;
}

export interface ISortable<T> {
  sort(comparer?: (a: T, b: T) => number): void;
}

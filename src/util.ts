export function deepClone<T>(object: T, cache: Map<any, any> = new Map()): T {
  if (typeof object !== "object" || object === null) return object;

  if (cache.has(object)) return cache.get(object);

  if (object instanceof Date) return new Date(object.getTime()) as unknown as T;

  if (object instanceof RegExp)
    return new RegExp(object.source, object.flags) as unknown as T;

  if (object instanceof Array) {
    const clonedArray = [] as unknown as T;
    cache.set(object, clonedArray);
    for (let i = 0; i < object.length; i++)
      clonedArray[i] = deepClone(object[i], cache);

    return clonedArray;
  }

  const clonedObject = Object.create(Object.getPrototypeOf(object));
  cache.set(object, clonedObject);

  for (const key in object)
    if (Object.prototype.hasOwnProperty.call(object, key))
      clonedObject[key] = deepClone(object[key], cache);

  return clonedObject;
}

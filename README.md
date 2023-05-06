# ts-data-structures

This TypeScript library provides implementations of commonly used data structures including Stack, Queue, and LinkedList, along with a JSON Parser to convert JSON text into these data structures.

[![npm version](https://img.shields.io/npm/v/@beratiyilik/ts-data-structures.svg?style=flat)](https://www.npmjs.com/package/@beratiyilik/ts-data-structures) [![Build Status](https://github.com/beratiyilik/ts-data-structures/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/beratiyilik/ts-data-structures/actions/workflows/npm-publish.yml) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Current Status](#current-status)
- [Code Overview](#code-overview)
- [Installation](#installation)
- [Usage](#usage)
  - [Stack](#stack)
  - [Queue](#queue)
  - [LinkedList](#linkedlist)
  - [JSON Parsing](#json-parsing)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- Node.js
- TypeScript

## Current Status

> **Warning**
> This project is presently in its **beta phase** and has not yet reached a stage suitable for production deployment. Users are encouraged to experiment with the available beta versions and share their feedback. However, be aware that there may be bugs and limitations during this stage.

Keep an eye out for future updates and a version suitable for production use! At this point in the development process, the following data structures and supporting functions have been created:

- Stack
- Queue
- Linked List
- JSON Parsing

## Code Overview

This project provides utility functions for parsing JSON data and converting it into various data structures such as Stack, Queue, and Linked List. Here's a brief overview of the code:

1. **Interfaces**: The project defines interfaces for `ILinkedList`, `IQueue`, and `IStack`.
2. **Implementations**: The `LinkedList`, `Queue`, and `Stack` classes implement the corresponding interfaces.
3. **Parser**: The `Parser` class contains static methods for parsing JSON data and converting it into the desired data structures.
4. **JSON Extension**: The global `JSON` object is extended with additional methods like `parseToStack`, `parseToQueue`, and `parseToLinkedList` which utilize the `Parser` class methods.

## Installation

To install the library, run the following command:
```bash
npm install @beratiyilik/ts-data-structures
```

Import the package in your project's entry point, such as `index.ts` or `app.ts`:
```typescript
import "@beratiyilik/ts-data-structures";
```
By importing the package in your application's entry point, you will be able to access the JSON parser functions provided by this library throughout your project.

## Usage

### Stack
```typescript
const stack = new Stack<User>();

stack.push(new User(1, 'Alice', 'alice@example.com', 30));
stack.push(new User(2, 'Bob', 'bob@example.com', 35));
stack.push(new User(3, 'Charlie', 'charlie@example.com', 25));

stack.pop() // {"id":3,"name":"Charlie","email":"charlie@example.com","age":25}
```

### Queue
```typescript
const queue = new Queue<User>();

queue.enqueue(new User(1, 'Alice', 'alice@example.com', 30));
queue.enqueue(new User(2, 'Bob', 'bob@example.com', 35));
queue.enqueue(new User(3, 'Charlie', 'charlie@example.com', 25));

queue.dequeue(); // {"id":1,"name":"Alice","email":"alice@example.com","age":30}
```

### LinkedList
```typescript
const linkedList = new LinkedList<User>();

linkedList.insertAtEnd(new User(1, 'Alice', 'alice@example.com', 30));
linkedList.insertAtEnd(new User(2, 'Bob', 'bob@example.com', 35));
linkedList.insertAtEnd(new User(3, 'Charlie', 'charlie@example.com', 25));
linkedList.insertAtEnd(new User(4, 'David', 'david@example.com', 40));
linkedList.insertAtEnd(new User(5, 'Eve', 'eve@example.com', 29));
linkedList.insertAtBeginning(new User(6, 'Frank', 'frank@example.com', 31));
linkedList.insertAtBeginning(new User(7, 'Grace', 'grace@example.com', 28));
linkedList.insertAtBeginning(new User(8, 'Helen', 'helen@example.com', 33));

linkedList.get(({ name }) => name === 'David'); // { "id": 4, "name": "David", email: "david@example", age: 40 }
```

### JSON Parsing
```typescript
const jsonText = `[{"id":1,"name":"Alice","email":"alice@example.com","age":30},{"id":2,"name":"Bob","email":"bob@example.com","age":35}]`;

const users = JSON.parseToQueue<User>(jsonText, null, ({ id, ...rest }) => ({
  id: 1000 + id,
  ...rest,
}));

users.dequeue(); // {"id":1001,"name":"Alice","email":"alice@example.com","age":30}
```

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/beratiyilik/ts-data-structures/issues).

## License

This project is licensed under the MIT License, © [Berat Iyilik](https://beratiyilik.com). See the [LICENSE](LICENSE) file for more details.


# ts-data-structures

This TypeScript library provides implementations of commonly used data structures including Stack, Queue, and LinkedList, along with a JSON Parser to convert JSON text into these data structures.

[![npm version](https://img.shields.io/npm/v/@beratiyilik/ts-data-structures.svg?style=flat)](https://www.npmjs.com/package/@beratiyilik/ts-data-structures)

> **Warning**
> This project is currently in its **beta stage** and not yet ready for production use. Users are welcome to test the available beta releases and provide feedback. However, please be prepared for potential bugs and limitations at this stage.

> Stay tuned for further updates and a production-ready release!

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

The project is still in the development phase. Currently, the following data structures and helper functions have been implemented:

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
### Queue
### LinkedList
### JSON Parsing

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/beratiyilik/ts-data-structures/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

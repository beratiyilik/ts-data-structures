/*
export * from "./queue";
export * from "./stack";
export * from "./linked-list";
*/
import { Queue, PriorityQueue } from "./queue/index.ts";

class User {
  id: number;
  name: string;
  email: string;
  age: number;

  constructor(id: number, name: string, email: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

const queue = new Queue<User>();

queue.enqueue(new User(1, 'Alice', 'alice@example.com', 30));
queue.enqueue(new User(2, 'Bob', 'bob@example.com', 35));
queue.enqueue(new User(3, 'Charlie', 'charlie@example.com', 25));
queue.enqueue(new User(4, 'David', 'david@example.com', 40));
queue.enqueue(new User(5, 'Eve', 'eve@example.com', 29));
queue.enqueue(new User(6, 'Frank', 'frank@example.com', 31));
queue.enqueue(new User(7, 'Grace', 'grace@example.com', 28));
queue.enqueue(new User(8, 'Helen', 'helen@example.com', 33));

queue.forEach(user => {
  console.log(user);
});

/*
const usersList = new LinkedList<User>();

usersList.append(new User(1, 'Alice', 'alice@example.com', 30));
usersList.append(new User(2, 'Bob', 'bob@example.com', 35));
usersList.append(new User(3, 'Charlie', 'charlie@example.com', 25));
usersList.append(new User(4, 'David', 'david@example.com', 40));
usersList.append(new User(5, 'Eve', 'eve@example.com', 29));
usersList.append(new User(6, 'Frank', 'frank@example.com', 31));
usersList.append(new User(7, 'Grace', 'grace@example.com', 28));
usersList.append(new User(8, 'Helen', 'helen@example.com', 33));
*/
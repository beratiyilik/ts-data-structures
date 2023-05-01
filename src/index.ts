/*
export * from "./queue";
export * from "./stack";
export * from "./linked-list";
*/
export { Queue, PriorityQueue } from "./queue";


/*
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
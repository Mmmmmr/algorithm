import IStack from "./IStack";

export class ArrayStack<T> implements IStack<T> {
  private data: T[] = [];

  push(element: T) {
    this.data.push(element);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  size() {
    return this.data.length;
  }
}



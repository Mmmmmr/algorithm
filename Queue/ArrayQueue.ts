import IQueue from "./IQueue";

export default class ArrayQueue<T> implements IQueue<T> {
  protected data: T[] = [];

  enqueue(element: T): void {
    this.data.push(element);
  }
  dequeue() {
    return this.data.shift();
  }
  peek(): T | undefined {
    return this.data[0];
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }
  size(): number {
    return this.data.length;
  }
}

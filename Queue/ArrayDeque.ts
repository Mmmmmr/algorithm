import ArrayQueue from "./ArrayQueue";

export default class ArrayDeque<T> extends ArrayQueue<T> {
  addFront(value: T) {
    this.data.unshift(value);
  }
  removeBack() {
    return this.data.pop();
  }
}

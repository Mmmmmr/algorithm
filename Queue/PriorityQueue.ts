import Heap from "../Heap/Heap";

class PriorityNode<T> {
  priority: number;
  value: T;
  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}

export default class PriorityQueue<T> {
  private heap: Heap<PriorityNode<T>> = new Heap();

  enqueue(value: T, priority: number) {
    const newNode = new PriorityNode(value, priority);
    this.heap.insert(newNode);
  }

  dequeue(): T | undefined {
    return this.heap.extract()?.value;
  }

  peek(): T | undefined {
    return this.heap.peek()?.value;
  }

  isEmpty() {
    return this.heap.size() === 0;
  }

  size() {
    return this.heap.size();
  }
}

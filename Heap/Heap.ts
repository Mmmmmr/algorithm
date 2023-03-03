export default class Heap<T> {
  private data: T[] = [];
  private length: number = 0;

  constructor(arr: T[] = []) {
    this.buildHeap(arr);
  }

  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  insert(value: T) {
    this.data.push(value);
    this.length++;
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] <= this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  extract(): T | undefined {
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      return this.data.pop()!;
    }
    const topValue = this.data[0];
    this.data[0] = this.data.pop()!;
    this.length--;

    this.heapifyDown(0);

    return topValue;
  }

  private heapifyDown(index: number) {
    while (2 * index + 1 < this.length) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = leftChildIndex + 1;
      let largerIndex = leftChildIndex;
      if (
        rightChildIndex < this.length &&
        this.data[rightChildIndex] > this.data[leftChildIndex]
      ) {
        largerIndex = rightChildIndex;
      }
      if (this.data[index] >= this.data[largerIndex]) break;
      this.swap(index, largerIndex);
      index = largerIndex;
    }
  }
  peek(): T | undefined {
    return this.data[0];
  }
  size() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }
  buildHeap(arr: T[]) {
    this.data = arr;
    this.length = arr.length;

    const start = Math.floor((this.length - 1) / 2);
    for (let i = start; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

const arr = [9, 11, 20, 56, 23, 45];
const heap = new Heap<number>();
heap.buildHeap(arr);
console.log(heap);

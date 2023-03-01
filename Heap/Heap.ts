export default class Heap<T> {
  private data: T[] = [];
  private length: number = 0;

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
    return;
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
  buildHeap(arr: T[]) {}
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];
const heap = new Heap<number>();
for (const i of arr) {
  heap.insert(i);
}
console.log(heap);
heap.insert(133);
console.log(heap);

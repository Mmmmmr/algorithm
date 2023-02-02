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

function tenToBlob(number: number) {
  const stack = new ArrayStack<number>();
  let remain = number;
  while (remain >= 2) {
    const temp = remain % 2;
    remain = Math.floor(remain / 2);
    stack.push(temp);
  }
  let data = "";
  while (!stack.isEmpty()) {
    data += stack.pop();
  }
  return data;
}

console.log(tenToBlob(35));

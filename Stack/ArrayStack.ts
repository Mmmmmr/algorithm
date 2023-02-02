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

function decimalToBinary(decimal: number) {
  const stack = new ArrayStack<number>();
  while (decimal >= 0) {
    const result = decimal % 2;
    decimal = Math.floor(decimal / 2);
    stack.push(result);
  }
  let binary = "";
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }
  return binary;
}

console.log(decimalToBinary(35));
console.log(decimalToBinary(100));

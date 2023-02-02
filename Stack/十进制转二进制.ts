import { ArrayStack } from "./ArrayStack";
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
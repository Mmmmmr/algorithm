import { ArrayStack } from "../../Stack/ArrayStack";

function isValid(s: string): boolean {
    const stack = new ArrayStack<string>()
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if(char === '(') {
            stack.push(')')
        } else if(char === '[') {
            stack.push(']')
        } else if(char === '{') {
            stack.push('}')
        } else {
            if(char !== stack.pop()) return false
        }
    }
    return stack.isEmpty()
};

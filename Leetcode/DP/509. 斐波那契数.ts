function fib(n: number): number {
  if (n <= 1) return n;
  let prev = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    const newVal = prev + cur;
    prev = cur;
    cur = newVal;
  }
  return cur;
}

console.log(fib(10));

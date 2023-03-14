function climbStairs(n: number): number {
  if (n <= 1) return n;
  const dp: number[] = [];

  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

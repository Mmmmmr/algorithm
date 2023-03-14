function maxProfit(prices: number[]): number {
  if (prices.length <= 1) return 0;
  const dp: number[] = [];

  dp[0] = prices[0];
  let min = dp[0];
  for (let i = 1; i < prices.length; i++) {
    min = Math.min(prices[i], min);
    dp[i] = prices[i] - min;
  }

  return Math.max(...dp);
}

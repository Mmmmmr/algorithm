function maxSubArray(nums: number[]): number {
  const dp: number[] = [];
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }
  return Math.max(...dp);
}

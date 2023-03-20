function lengthOfLongestSubstring(s: string): number {
  const n = s.length;

  let left = 0;
  const map = new Map<string, number>();
  let maxLength = 0;
  for (let right = 0; right < n; right++) {
    const rightChat = s[right];
    if (map.has(rightChat) && map.get(rightChat)! >= left) {
      left = map.get(rightChat)! + 1;
    }
    map.set(rightChat, right);
    const currentLength = right - left + 1;
    maxLength = Math.max(currentLength, maxLength);
  }
  return maxLength;
}

console.log(lengthOfLongestSubstring("abcdeaaaa"));

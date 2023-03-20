function longestCommonPrefix(strs: string[]): string {
  let prefix = strs[0];

  for (const str of strs) {
    while (str.indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix.length === 0) return "";
    }
  }

  return prefix;
}

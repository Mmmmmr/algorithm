export function swap(array: number[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function isSorted(arr: number[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

type SortAlogFn = (arr: number[]) => number[];
export function testSort(sortFn: SortAlogFn) {
  const nums = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 200)
  );
  console.log("排序前： ", nums);
  const newNums = sortFn(nums);
  console.log("排序后：", newNums);
  console.log("排序后的顺序是否正确：", isSorted(newNums));
}

import ListNode from "./ListNode";

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;
  let addOne = 0;
  while (l1 || l2 || addOne != 0) {
    if (l1) {
      addOne += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      addOne += l2.val;
      l2 = l2.next;
    }
    current.next = new ListNode(addOne % 10);
    addOne = addOne >= 10 ? 1 : 0;
    current = current.next;
  }

  return dummy.next;
}

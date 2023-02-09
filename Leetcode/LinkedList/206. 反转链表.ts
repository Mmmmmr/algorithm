import ListNode from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  let newHead: ListNode | null = null;
  while (head) {
    let current = head.next;
    head.next = newHead;
    newHead = head;
    head = current;
  }
  return newHead;
}

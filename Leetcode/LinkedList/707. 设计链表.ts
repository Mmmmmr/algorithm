class MyLinkedList {
  private head: Node<number> | null = null;
  private size: number = 0;
  constructor() {}

  get(index: number): number {
    if (index < 0 || index >= this.size) return -1;

    return this.getNode(index)?.value ?? -1;
  }

  addAtHead(val: number): void {
    this.insert(val, 0);
  }

  addAtTail(val: number): void {
    this.insert(val, this.size);
  }

  addAtIndex(index: number, val: number): void {
    this.insert(val, index);
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) return;
    let current = this.head;

    if (index === 0) {
      this.head = current!.next;
    } else {
      const previous = this.getNode(index - 1);
      current = previous?.next ?? null;
      previous!.next = previous?.next?.next ?? null;
    }
    this.size--;
  }

  insert(element: number, position: number) {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(element);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      const previous = this.getNode(position - 1);
      newNode.next = previous!.next;
      previous!.next = newNode;
    }
    this.size++;
    return true;
  }

  private getNode(position: number) {
    let current = this.head;
    let index = 0;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
  }

  traverse() {
    const values: number[] = [];

    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join("->"));
  }
}

class Node<T> {
  next: Node<T> | null = null;
  constructor(public value: T) {}
}
/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
const linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1, 2); //链表变为1-> 2-> 3
linkedList.get(1); //返回2
linkedList.deleteAtIndex(1); //现在链表是1-> 3
linkedList.get(1); //返回3
linkedList.traverse();

export {};

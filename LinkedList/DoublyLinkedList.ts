import LinkedList from "./LinkedList";
import { DoublyNode } from "./LinkedNode";

export default class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null;

  append(value: T): void {
    const newNode = new DoublyNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(value: T): void {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  postTraverse() {
    const values: T[] = [];
    let current = this.tail;
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
    console.log(`${values.join(" -> ")}`);
  }

  insert(value: T, position: number): boolean {
    if (position < 0 || position > this.length) return false;
    if (position === 0) {
      this.prepend(value);
    } else if (position === this.length) {
      this.append(value);
    } else {
      const newNode = new DoublyNode(value);
      const current = this.getNode(position) as DoublyNode<T>;

      current.prev!.next = newNode;
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev = newNode;

      this.length++;
    }

    return true;
  }

  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length) return null;

    let current = this.head;
    if (position === 0) {
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else {
        current = this.tail;
        this.head = this.head!.next;
        this.head!.prev = null;
      }
    } else if (position === this.length - 1) {
      current = this.tail;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      current = this.getNode(position) as DoublyNode<T>;
      current!.next!.prev = current.prev;
      current!.prev!.next = current.next;
    }
    this.length--;
    return current?.value ?? null;
  }
}

const dlist = new DoublyLinkedList<string>();
dlist.append("aaa");
dlist.append("bbb");
dlist.append("ccc");

dlist.postTraverse();

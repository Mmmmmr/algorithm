export default class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  get length() {
    return this.size;
  }

  append(element: T) {
    const node = new Node(element);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
  }

  insert(element: T, position: number) {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(element);
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous: Node<T> | null = null;
      let index = 0;
      while (index < position) {
        previous = current;
        current = current!.next;
        index++;
      }
      newNode.next = current;
      previous!.next = newNode;
    }
    this.size++;
    return true;
  }

  removeAt(position: number) {
    if (position < 0 || position >= this.size) return false;

    if (position === 0) {
      this.head = this.head!.next;
    }
  }

  traverse() {
    const values: T[] = [];

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

const list = new LinkedList<string>();
list.append("aaa");
list.append("bbb");
list.append("ccc");
list.append("ddd");
list.traverse();
list.insert("eee", 0);
list.insert("fff", 1);
list.insert("ggg", 4);

list.traverse();
list.removeAt(0);
list.removeAt(0);
list.traverse();

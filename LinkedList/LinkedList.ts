export default class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  get length() {
    return this.size;
  }

  private getNode(position: number) {
    let current = this.head;
    let index = 0;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
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
      const previous = this.getNode(position - 1);
      newNode.next = previous!.next;
      previous!.next = newNode;
    }
    this.size++;
    return true;
  }

  removeAt(position: number) {
    if (position < 0 || position >= this.size) return null;
    let current = this.head;

    if (position === 0) {
      this.head = current!.next;
    } else {
      const previous = this.getNode(position - 1);
      current = previous?.next ?? null;
      previous!.next = previous?.next?.next ?? null;
    }
    this.size--;
    return current?.value ?? null;
  }

  indexOf(value: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  get(position: number) {
    if (position < 0 || position >= this.size) return null;

    return this.getNode(position)?.value ?? null;
  }

  update(position: number, value: T) {
    if (position < 0 || position >= this.size) return false;
    const current = this.getNode(position);
    current!.value = value;
    return true;
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

  remove(value: T) {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.length === 0;
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
console.log(list.removeAt(2));
console.log(list.removeAt(4));
list.traverse();
console.log(list.get(2));
console.log(list.get(3));
list.traverse();
list.update(0, "eee1");
list.update(2, "bbb1");
list.update(4, "ddd1");
list.traverse();
console.log(
  list.indexOf("ddd1"),
  list.indexOf("ddd2"),
  list.indexOf("eee1"),
  list.indexOf("eee2"),
  list.indexOf("eee2")
);

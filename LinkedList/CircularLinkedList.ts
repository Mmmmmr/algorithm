import LinkedList from "./LinkedList";

class CircularLinkedList<T> extends LinkedList<T> {
  append(value: T): void {
    super.append(value);
    this.tail!.next = this.head;
  }

  insert(value: T, position: number): boolean {
    const isSuccess = super.insert(value, position);

    if (isSuccess && (position === 0 || position === this.length - 1)) {
      this.tail!.next = this.head;
    }

    return isSuccess;
  }

  removeAt(position: number): T | null {
    const value = super.removeAt(position);

    if (value && this.tail && (position === 0 || position === this.length)) {
      this.tail.next = this.head;
    }

    return value;
  }
}

export default CircularLinkedList;

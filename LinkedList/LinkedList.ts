export default class LinkedList<T> {
    private head: Node<T> | null = null
    private size: number = 0

    get length() {
        return this.size
    }

    append(element: T) {
        const node = new Node(element)
        
        if(!this.head) {
            this.head = node
        } else {
            let current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }

        this.size++
    }

    traverse() {
        const values: T[] = []
        
        let current = this.head
        while(current) {
            values.push(current.value)
            current = current.next
        }
        console.log(values.join('->'))
    }
}

class Node<T> {
    next: Node<T> | null = null
    constructor(public value: T) {}
}

const list = new LinkedList<string>()
list.append('aaa')
list.append('bbb')
list.append('ccc')
list.append('ddd')
list.traverse()
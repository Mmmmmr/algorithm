import { btPrint } from "hy-algokit";
export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null;

  get isLeft() {
    return !!(this.parent && this.parent.left === this);
  }

  get isRight() {
    return !!(this.parent && this.parent.right === this);
  }

  constructor(value: T) {
    this.value = value;
  }
}

export default class BinarySearchTree<T> {
  protected root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  protected createNode(value: T): TreeNode<T> {
    return new TreeNode(value);
  }

  insert(value: T) {
    const newNode = this.createNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }

    this.checkBalance(newNode);
  }

  protected checkBalance(node: TreeNode<T>) {}

  insertNode<T>(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (node.value > newNode.value) {
      if (node.left === null) {
        node.left = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        newNode.parent = node;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }

  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value);
      this.preOrderTraverseNode(node.left);
      this.preOrderTraverseNode(node.right);
    }
  }

  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }

  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left);
      console.log(node.value);
      this.inOrderTraverseNode(node.right);
    }
  }

  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }

  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left);
      this.postOrderTraverseNode(node.right);
      console.log(node.value);
    }
  }

  levelOrderTraverse() {
    if (!this.root) return;
    const queue: TreeNode<T>[] = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const current = queue.shift()!;
      console.log(current.value);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  getMaxValue() {
    let current = this.root;
    while (current && current.right) {
      current = current.right;
    }
    return current?.value;
  }

  getMinValue() {
    let current = this.root;
    while (current && current.left) {
      current = current.left;
    }
    return current?.value;
  }

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      if (current.value === value) return current;
      parent = current;
      if (current.value > value) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current) current.parent = parent;
    }
    return null;
  }

  search(value: T): boolean {
    return !!this.searchNode(value);
  }

  getSuccessor(delNode: TreeNode<T>) {
    let current = delNode.right;
    let successor: TreeNode<T> | null = null;
    while (current) {
      successor = current;
      current = current.left;
      if (current) {
        current.parent = successor;
      }
    }

    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right;
      if (successor?.right) {
        successor.right.parent = successor.parent;
      }
    } else {
      delNode.right = successor!.right;
      if (successor?.right) {
        successor.right.parent = delNode;
      }
    }

    return successor!;
  }

  remove(value: T): boolean {
    const current = this.searchNode(value);

    if (!current) return false;
    let delNode = current;

    let replaceNode: TreeNode<T> | null = null;

    if (current.left === null && current.right === null) {
      replaceNode = null;
    } else if (current.left === null) {
      replaceNode = current.right;
    } else if (current.right === null) {
      replaceNode = current.left;
    } else {
      const successor = this.getSuccessor(current);
      current.value = successor.value;
      delNode = successor;
      this.checkBalance(delNode);
      return true;
    }
    if (current === this.root) {
      this.root = replaceNode;
    } else if (current.isLeft) {
      current.parent!.left = replaceNode;
    } else {
      current.parent!.right = replaceNode;
    }
    if (replaceNode && current.parent) {
      replaceNode.parent = current.parent;
    }
    this.checkBalance(delNode);
    return false;
  }
}

const bst = new BinarySearchTree<number>();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

bst.print();
bst.remove(3);
bst.remove(8);
bst.remove(12);
bst.print();
bst.remove(5);
bst.remove(9);
bst.print();
bst.remove(15);
bst.print();
bst.remove(7);
bst.print();
bst.remove(20);
bst.print();
bst.remove(11);
bst.print();

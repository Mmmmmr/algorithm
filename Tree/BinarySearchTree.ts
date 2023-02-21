import { btPrint } from "hy-algokit";
class TreeNode<T> {
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

class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  insert(value: T) {
    const newNode = new TreeNode(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode<T>(root: TreeNode<T>, newNode: TreeNode<T>) {
    if (root.value > newNode.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
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

  remove(value: T): boolean {
    const current = this.searchNode(value);

    if (!current) return false;

    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (current.isLeft) {
        current.parent!.left = null;
      } else {
        current.parent!.right = null;
      }
    } else if (current.left === null) {
      if (current === this.root) {
        this.root = null;
      } else if (current.isLeft) {
        current.parent!.left = current.right;
      } else {
        current.parent!.right = current.right;
      }
    } else if (current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (current.isLeft) {
        current.parent!.left = current.left;
      } else {
        current.parent!.right = current.left;
      }
    }

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

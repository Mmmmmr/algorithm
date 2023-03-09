import BinarySearchTree, { TreeNode } from "./BinarySearchTree";

export class AVLTreeNode<T> extends TreeNode<T> {
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;

  height: number = 1;

  private getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  private getBalanceFactor(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return leftHeight - rightHeight;
  }

  get isBalanced(): boolean {
    const factor = this.getBalanceFactor();
    return factor >= -1 && factor <= 1;
  }

  get higherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;
    if (leftHeight > rightHeight) return this.left;
    if (leftHeight < rightHeight) return this.right;
    return this.isLeft ? this.left : this.right;
  }

  rightRotation() {
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    const pivot = this.left!;
    pivot.parent = this.parent;

    this.left = pivot.right;
    if (pivot.right) {
      pivot.right.parent = this;
    }

    pivot.right = this;
    this.parent = pivot;

    if (!pivot.parent) {
      return pivot;
    } else if (isLeft) {
      pivot.parent.left = pivot;
    } else if (isRight) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }

  leftRotation() {
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    const pivot = this.right!;
    pivot.parent = this.parent;

    this.right = pivot.left;
    if (pivot.left) {
      pivot.left.parent = this;
    }

    pivot.left = this;
    this.parent = pivot;

    if (!pivot.parent) {
      return pivot;
    } else if (isLeft) {
      pivot.parent.left = pivot;
    } else if (isRight) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }
}

export default class AVLTree<T> extends BinarySearchTree<T> {
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value);
  }

  checkBalance(node: AVLTreeNode<T>): void {
    let current = node.parent;
    while (current) {
      if (!current.isBalanced) {
        this.rebalance(current);
      }
      current = current.parent;
    }
  }

  rebalance(root: AVLTreeNode<T>) {
    const pviot = root.higherChild;
    const current = pviot?.higherChild;

    let resultNode: AVLTreeNode<T> | null = null;
    if (pviot?.isLeft) {
      if (current?.isLeft) {
        resultNode = root.rightRotation();
      } else {
        current?.leftRotation();
        resultNode = root.rightRotation();
      }
    } else {
      if (current?.isLeft) {
        pviot?.rightRotation();
        resultNode = root.leftRotation();
      } else {
        resultNode = root.leftRotation();
      }
    }

    if (!resultNode) {
      this.root = resultNode;
    }
  }
}

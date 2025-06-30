class BPlusTreeNode {
  constructor(isLeaf = false) {
    this.isLeaf = isLeaf;
    this.keys = [];
    this.children = [];
    this.next = null; // used in leaf nodes for range queries
  }
}

class BPlusTree {
  constructor(order = 4) {
    this.root = new BPlusTreeNode(true);
    this.order = order;
  }

  insert(key) {
    const root = this.root;
    const [newKey, newChild] = this._insert(root, key);

    if (newChild) {
      const newRoot = new BPlusTreeNode(false);
      newRoot.keys = [newKey];
      newRoot.children = [root, newChild];
      this.root = newRoot;
    }
  }

  _insert(node, key) {
    const pos = this._findInsertPos(node.keys, key);

    if (node.isLeaf) {
      node.keys.splice(pos, 0, key);
    } else {
      const [upKey, newChild] = this._insert(node.children[pos], key);
      if (newChild) {
        node.keys.splice(pos, 0, upKey);
        node.children.splice(pos + 1, 0, newChild);
      }
    }

    if (node.keys.length >= this.order) {
      return this._split(node);
    }

    return [null, null];
  }

  _split(node) {
    const mid = Math.floor(this.order / 2);
    const newNode = new BPlusTreeNode(node.isLeaf);
    const promoteKey = node.keys[mid];

    newNode.keys = node.keys.splice(node.isLeaf ? mid : mid + 1);
    if (!node.isLeaf) {
      newNode.children = node.children.splice(mid + 1);
    }

    if (node.isLeaf) {
      newNode.next = node.next;
      node.next = newNode;
    }

    return [promoteKey, newNode];
  }

  _findInsertPos(arr, key) {
    let i = 0;
    while (i < arr.length && arr[i] < key) i++;
    return i;
  }

  search(key) {
    let node = this.root;
    while (!node.isLeaf) {
      const pos = this._findInsertPos(node.keys, key);
      node = node.children[pos];
    }
    return node.keys.includes(key);
  }

  traverse() {
    let node = this.root;
    while (!node.isLeaf) node = node.children[0];
    const result = [];
    while (node) {
      result.push(...node.keys);
      node = node.next;
    }
    return result;
  }
}

// const bpt = new BPlusTree(4);
// [10, 20, 5, 6, 15, 25, 30, 35].forEach(k => bpt.insert(k));

// console.log('Search 15:', bpt.search(15)); // true
// console.log('Search 99:', bpt.search(99)); // false
// console.log('All Keys:', bpt.traverse());  // Sorted keys

export default BPlusTree;
class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(data) {
    const newNode = new Node(data);
    if (!this.root) {
      this.root = newNode;
    } else {
        this.insertNode(this.root, newNode);
      } 
  }
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
          this.insertNode(node.left, newNode);
        }
    } else {
        if (!node.right) {
          node.right = newNode;
        } else {
            this.insertNode(node.right, newNode);
          }
      }
  }
}

function randomNumber() {
  return Math.ceil(Math.random() * 50);
}

function createTree() {
  const obj = {};
  const numberNodes = 20;
  let random = randomNumber();
  obj[random] = true;
  const newBST = new BST();
  newBST.root = new Node(random);
  console.log('root.value ', newBST.root.value)
  while (Object.entries(obj).length < numberNodes) {
    random = randomNumber();
    if (!obj[random]) {
      obj[random] = true;
      console.log('random ', random);
      newBST.insert(random);
    }
  }
  return newBST;
}

module.exports = {
  createTree
};
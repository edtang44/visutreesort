class Node {
  constructor(value) {
      this.value = value;
      this.children = []; 
  }
}

/* BinarySearchTree
 The BinarySearchTree constructor sets the tree's root
 to the value passed into the constuctor. 
*/

class BST {
  constructor(value) {
      this.root = new Node(value);
  }

  /* insert */
  insert(value) {
      // create node from value
      var node = new Node(value);
      // if the tree's root is null, set the root to the new node
      if (this.root == null || this.root.value == null) {
          this.root = node;
      }

      var current = this.root;
      while (current) {
          // If tree contains value return
          if (current.value == value) {
              return;
          }
          // value is less than current.value
          else if (value < current.value) {
              
              if (current.children[0] == null || current.children[0].value == "e") {
                  current.children[0] = node;
                  if (current.children[1]==null){
                      current.children[1] = new Node("e");
                  }
                  return;
              }
              // current = current.left;
              current = current.children[0];
          }
          // value is greater than current.value
          else {
              if (current.children[1] == null || current.children[1].value == "e") {
                  // if (current.children[1] == null ){
                  if (!current.children[0]) {
                      current.children[0] = new Node("e");
                  }
                  current.children[1] = node;
                  return;
              }
              current = current.children[1];
          }
      }
  }
  /*End of Class*/
}

function randomNumber() {
  return Math.ceil(Math.random() * 50);
}

function createTree(num) {
  const obj = {};
  const numberNodes = num;
  let random = randomNumber();
  obj[random] = true;
  const newBST = new BST();
  newBST.root = new Node(random);
  while (Object.entries(obj).length < numberNodes) {
    random = randomNumber();
    if (!obj[random]) {
      obj[random] = true;
      newBST.insert(random);
    }
  }
  return newBST;
}

module.exports = {
  createTree
};
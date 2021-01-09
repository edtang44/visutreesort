/* 
  Constructor for individual node of binary search tree, with its value 
  passed into the constructor.  Children are stored in array
*/
class Node {
  constructor(value) {
    this.value = value;
    this.children = []; 
  }
}

/* 
  Constructor for binary search tree, with the value of its root set
  to the value passed into the constuctor. 
*/
class BST {
  constructor(value) {
      this.root = new Node(value);
  }

  // Constructor method for inserting new node into binary search tree
  insert(value) {
      // Stores new node created for binary search tree
      const node = new Node(value);
      // If root is null, sets root to new node
      if (!this.root) {
          this.root = node;
          return;
      }
      // Otherwise stores root as current node
      let current = this.root;
      while (current) {
        /* 
          If value is less than current node's value and 1st item of 
          children's array is empty, insert node as 1st item of array
        */
        if (value < current.value) {
          if (current.children[0] == null || current.children[0].value == "none") {
            current.children[0] = node;
            // If 2nd element of children array is empty, use "none" value as placeholder
            if (!current.children[1]) {
                current.children[1] = new Node("none");
            }
            return;
          }
          /* 
            If value is less than current node's value and 1st item of 
            children's array is present, set current node to 1st item of Array
          */
          current = current.children[0];
        }
          /*
            If value is greater than current node's value and 2nd item of 
            children's array is empty, insert node as 2nd item of array
          */
          else {
            if (current.children[1] == null || current.children[1].value == "none") {
              // If 1st element of children array is empty, use "none" value as placeholder
              if (!current.children[0]) {
                  current.children[0] = new Node("none");
              }
              current.children[1] = node;
              return;
            }
            /* 
              If value is greater than current node's value and 2nd item of children's array is present,
              set current node to 2nd item of Array
            */
            current = current.children[1];
          }
      }
  }
}

// Returns random number between 1 and num
function randomNumber(num) {
  return Math.floor(Math.random() * num) + 1;
}

function createTree(num) {
  // Empty object created for storing randomNumber values generated as keys with values of true
  const cache = {};
  const totalNodes = num;
  let random = randomNumber(num);
  cache[random] = true;
  const newBST = new BST();
  // Sets root of new binary search tree as node with value equal to first random number
  newBST.root = new Node(random);
  // Loop that adds additional tree nodes as long as number of keys in cache is less than total number of nodes
  while (Object.entries(cache).length < totalNodes) {
    random = randomNumber(num);
    // Checks if random number not chosen already and inserts new node into tree
    if (!cache[random]) {
      cache[random] = true;
      newBST.insert(random);
    }
  }
  // Returns new binary search tree with nodes with values from 1 to the argument supplied for num
  return newBST;
}

module.exports = {
  createTree
};
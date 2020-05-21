import React from 'react';
import { createTree } from '../helperfunctions/createTree';
const MainDisplay = () => {

  function handleCreateTree() {
    const newBST = createTree();
    console.log('newBST :', newBST.root);
  }

  return (
    <div>
      <h3>MainDisplay</h3>
      <button id='create-tree' onClick={() => handleCreateTree()}>
        Create a new Binary Search Tree
      </button>
    </div>
  );
}
 
export default MainDisplay;
import React, { useContext } from 'react';
import { createTree } from '../helperfunctions/createTree';
const { UserContext } = require("../context/UserContext");

const SideBar = () => {
  const { toggleTree } = useContext(UserContext);

  function handleCreateTree() {
    toggleTree();
    const newBST = createTree();
    console.log('newBST :', newBST.root);
  }

  return (
    <div>
      <h3>SideBar</h3>
      <button id='create-tree' onClick={() => handleCreateTree()}>
        Create a new Binary Search Tree
      </button>
      <button id='create-tree' onClick={() => toggleTree()}>
        Hide Binary Search Tree
      </button>
    </div>
  );
}
 
export default SideBar;
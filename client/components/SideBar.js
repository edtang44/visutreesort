import React, { useContext, useEffect, useState } from 'react';
import { createTree } from '../helperfunctions/createTree';
const { UserContext } = require("../context/UserContext");
import '../stylesheets/style.css';

const SideBar = () => {
  const [bst, setBst] = useState({});
  const [numNodes, setNumNodes] = useState(0);
  const { displayTree, toggleTree, addTree } = useContext(UserContext);

  function handleSubmit(e){
    if (e.target.value < 51) {
      setNumNodes(e.target.value);
    } else setNumNodes(0)
  }

  function removeTree() {
    const currentTree = document.querySelector('#currentTree');
    if (currentTree) {
      currentTree.remove();
    }
  }
  
  function handleCreateTree() {
    removeTree();
    if (!displayTree) toggleTree();
    const newBST = createTree(numNodes);
    setBst(newBST);
  }

  useEffect(()=> {
    addTree(bst);
  }, [bst]);

  return (
    <div>
      <label htmlFor="numNodes">Number Nodes</label>
      <input type="number" name="numNodes" value={numNodes} onChange={(e) => handleSubmit(e)} />
      <button id='create-tree' onClick={() => {handleCreateTree()}}>
        Create a new Binary Search Tree
      </button>
      <button id='create-tree' onClick={() => {if (displayTree) toggleTree()}}>
        Hide Binary Search Tree
      </button>
    </div>
  );
}
 
export default SideBar;
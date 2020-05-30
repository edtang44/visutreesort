import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createTree } from '../helperfunctions/createTree';
const { UserContext } = require("../context/UserContext");
import '../stylesheets/style.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const SideBarBST = () => {
  const [bst, setBst] = useState({});
  const [numNodes, setNumNodes] = useState(1);
  const { displayTree, toggleTree, addTree } = useContext(UserContext);
  const classes = useStyles();


  function handleSubmit(e){
    if (e.target.value > 50) e.target.value = 50;
    setNumNodes(e.target.value);
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
    <div className={classes.root}>
      <label htmlFor="numNodes">Number of Nodes (1-50)</label>
      <input type="number" name="numNodes" value={numNodes} min="1" max="50" onChange={(e) => handleSubmit(e)} />
      <Button variant="contained" color="primary" id='create-tree' onClick={() => {handleCreateTree()}}>
        Create a new Binary Search Tree
      </Button>
      <Button variant="contained" color="primary" id='create-tree' onClick={() => {if (displayTree) toggleTree()}}>
        Hide Binary Search Tree
      </Button>
    </div>
  );
}
 
export default SideBarBST;
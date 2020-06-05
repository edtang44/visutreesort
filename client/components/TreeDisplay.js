import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createTree } from '../helperfunctions/createTree';
import drawTree from '../helperfunctions/drawTree';
import { bfs, preOrder, inOrder, postOrder } from '../helperfunctions/bst-traversal';
import '../stylesheets/style.css';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const TreeDisplay = () => {
  const [bst, setBst] = useState({});
  const [numNodes, setNumNodes] = useState(1);
  const [displayTree, setDisplayTree] = useState(false);
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
    if (!displayTree) setDisplayTree(true);
    const newBST = createTree(numNodes);
    drawTree(newBST.root);
    setBst(newBST);
  }

  function handlePreOrder() {
    preOrder(bst);
  }

  function handlePostOrder() {
    postOrder([bst.root]);
  }

  function handleInOrder() {
    inOrder([bst.root]);
  }

  function handleBFS() {
    bfs(bst);
  }

  useEffect(
    () => {
       if (Object.entries(bst).length > 0) {
        removeTree();
        drawTree(bst.root);
       }
    }, [bst]
  );

  return (
    <div>
    <div className={classes.root}>
      <label htmlFor="numNodes">Number of Nodes (1-50)</label>
      <input type="number" name="numNodes" value={numNodes} min="1" max="50" onChange={(e) => handleSubmit(e)} />
      <Button variant="contained" color="primary" id='create-tree' onClick={() => {handleCreateTree()}}>
        Create a new Binary Search Tree
      </Button>
      <Button variant="contained" color="primary" id='create-tree' onClick={() => {if (displayTree) setDisplayTree(false)}}>
        Hide Binary Search Tree
      </Button>
      <div></div>
      <Button variant="contained" color="primary" id="preorder" onClick={() => handlePreOrder()}>
        PreOrder
      </Button>
      <Button variant="contained" color="primary" id="postorder" onClick={() => handlePostOrder()}>
        PostOrder
      </Button>
      <Button variant="contained" color="primary" id="inorder" onClick={() => handleInOrder()}>
        InOrder
      </Button>
      <Button variant="contained" color="primary" id="bfs" onClick={() => handleBFS()}>
        BFS
      </Button>
    </div>
       {displayTree && <div id='d3tree'>
      </div>}
    </div>
  );
}
 
export default TreeDisplay;
import React, { useEffect, useState, useRef } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { VStack, Heading, Box, Center, Input, Flex, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { createTree } from '../helperfunctions/createTree';
import drawTree from '../helperfunctions/drawTree';
import removeTree from '../helperfunctions/removeTree';
import { resetTraversal, bfs, preOrder, inOrder, postOrder } from '../helperfunctions/bst-traversal';
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
  const [numNodes, setNumNodes] = useState(10);
  const [displayTree, setDisplayTree] = useState(false);
  const [error, setError] = useState({});
  const [showModal, setShowModal] = useState(false);
  const svgRef = useRef(null);
  const classes = useStyles();

  function handleSubmit(e) {
    if (e.target.value < 50 || e.target.value > 1) {
      setNumNodes(e.target.value);
    } 
  }

  function handleCreateTree() {
    if (numNodes < 50 && numNodes > 0) {
      removeTree();
      if (!displayTree) setDisplayTree(true);
      const newBST = createTree(numNodes);
      drawTree(svgRef, newBST.root);
      setBst(newBST);
    } else {
        setNumNodes(10);
        console.log('error');
      }
  }

  function handlePreOrder() {
    preOrder(bst);('')
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

  function handleOpenModal() {
    setShowModal(true);
  }
  
  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(
    () => {
       if (Object.entries(bst).length > 0) {
        removeTree();
        drawTree(svgRef, bst.root);
       }
    }, [bst]
  );

  return (
    <div>
      <VStack w="100%" h="100px" spacing="80px">
      {!displayTree &&
      (<> 
      <Center marginTop="75px" w="100%" h="140px">
        <Box w="800px" h="140px">
          <Heading as="h1" size="xl">Welcome to our BST traversal visualizer!</Heading>
          <Text as="i" fontSize="28px">To begin, please enter the number of nodes you would like in your binary search tree</Text>
        </Box>
      </Center>
      </>)}
      {displayTree &&
      (<> 
      <Center w="100%" h="50px">
        <Box w="70%" h="50px">
          <Heading as="h1" size="lg">Now choose a type of binary tree traversal</Heading>
        </Box>
      </Center>
      </>)}
      <Center>
        {!displayTree && <Text fontSize="xl">Number of Nodes (1-50)</Text>}
        {!displayTree && <Input autoFocus fontSize="xl" width="14" type="number" name="numNodes" value={numNodes} min="1" max="50" onChange={(e) => handleSubmit(e)} />}
      </Center>

      <ButtonGroup colorScheme="blue" size="lg" variant="outline" spacing="6">
        {!displayTree && <Button id='create-tree' onClick={() => {handleCreateTree()}}>
          Create Binary Search Tree
        </Button>}
      </ButtonGroup>
      </VStack>

      <Flex direction='row' flexWrap="wrap" justify="center">
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={handlePreOrder}>
          PreOrder
        </Button>}
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={handlePostOrder}>
          PostOrder
        </Button>}
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={handleInOrder}>
          InOrder
        </Button>}
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={handleBFS}>
          Breadth First 
        </Button>}
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" id='create-tree' onClick={() => {resetTraversal()}}>
          Reset
        </Button>}
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" id='create-tree' onClick={() => {setDisplayTree(false)}}>
           New Tree
        </Button>}
        {displayTree && <Button colorScheme="blue" size="lg" variant="outline" spacing="6" id='create-tree'  as={Link} to="/">
           Main Menu
        </Button>}
      </Flex>
      <div>
        {displayTree && (
        <>
          <ChakraLink  size="lg" variant="outline" spacing="6" onClick={handleOpenModal}>Click here for more about traversal types</ChakraLink >
          <ReactModal 
            isOpen={showModal}
            contentLabel="Tree Traversal Explanations"
          >
            <button onClick={handleCloseModal}>Close</button>
            <Text></Text>
            &nbsp;
            &nbsp;
            <Text>Preorder Traversal:</Text>
            <Text>1. Visit root</Text>
            <Text>2. Traverse left subtree by recursively calling Preorder function</Text>
            <Text>3. Traverse right subtree by recursively calling Preorder function</Text>
            &nbsp;
            <Text>Postorder Traversal</Text>
            <Text>1. Traverse left subtree by recursively calling Postorder function</Text>
            <Text>2. Traverse right subtree by recursively calling Postorder function</Text>
            <Text>3. Visit root</Text>
            &nbsp;
            <Text>Inorder Traversal:</Text>
            <Text>1. Traverse left subtree by recursively calling Inorder function</Text>
            <Text>2. Visit root</Text>
            <Text>3. Traverse right subtree by recursively calling Inorder function</Text>
            &nbsp;
            <Text>Breadth First Order Traversal:</Text>
            <Text>Visit every node on a level before going to another level</Text>

          </ReactModal>
           </>)}
      </div>
      
        {/* {displayTree && <Text fontSize="2xl">{`${traversalType} Traversal`}</Text>} */}
        {displayTree && <div ref={svgRef}>
        </div>}
    </div>
  );
}
 
export default TreeDisplay;
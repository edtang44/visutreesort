import React from 'react';
import { Link } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import '../stylesheets/style.css';
import { Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import { Text } from '@chakra-ui/core';

const Header = () => {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
  return (
    <>
      <Flex w="100%" h="100px"/>
      <animated.div style={props}>
        <Heading as="h1" size="2xl"> 
          VisuTreeSort 
        </Heading>
        <Text as="i" fontSize="30px">visualizing binary tree traversals and sorting algorithms through animation</Text>
      </animated.div>
      <Flex w="100%" h="100px"/>
      <ButtonGroup colorScheme="blue" size="lg" variant="outline" spacing="6">
        <Button as={Link} to="/bst">
          Binary Tree Traversal
        </Button>   
        <Button as={Link} to="/sort">
          Sorting Algorithms
        </Button>   
      </ButtonGroup>
    </>
  );
}
 
export default Header;
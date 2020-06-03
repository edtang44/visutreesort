import React from 'react';
import { Link } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import Button from '@material-ui/core/Button';
import '../stylesheets/style.css';

const Header = () => {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
  return (
    <>
      <animated.div className="main-header" style={props}>
        <h1>Binary Search Tree and Sorting Algorithm Visualizer</h1>
      </animated.div>
      <Button variant="outlined" size="large" color="primary" component={Link} to="/sort">
        Sorting Algorithms
      </Button>   
      <Button variant="outlined" size="large" color="primary" component={Link} to="/bst">
        Binary Search Tree Traversal
      </Button>   
    </>
  );
}
 
export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'
import '../stylesheets/style.css';

const Header = () => {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
  return (
    <>
      <animated.div className="main-header" style={props}>
        <h4>Binary Search Tree and Sorting Algorithm Visualizer</h4>
      </animated.div>
      <Link to="/bst">Binary Search Tree</Link>
      <div></div>
      <Link to="/sort">Sorting Algorithms</Link>
    </>
  );
}
 
export default Header;
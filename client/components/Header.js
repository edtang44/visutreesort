import React from 'react';
import {useSpring, animated} from 'react-spring'
import '../stylesheets/style.css';

const Header = () => {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
  return (
    <animated.div className="main-header" style={props}>
      <h1>BST Visualizer</h1>
    </animated.div>
  );
}
 
export default Header;
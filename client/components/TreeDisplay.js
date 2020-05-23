import React, { useContext, useRef, useEffect} from 'react';
import drawTree from '../helperfunctions/drawTree';
const { UserContext } = require("../context/UserContext");
import '../stylesheets/style.css';

const TreeDisplay = () => {
  // const ref = useRef(null);
  const { displayTree, tree } = useContext(UserContext);

  useEffect(
    () => {
       if (Object.entries(tree).length > 0) drawTree(tree.root);
    }, [tree]
  );

  return (
    <>
    { displayTree && <svg id='d3tree'> </svg>}
    </>
  );
};
 
export default TreeDisplay;
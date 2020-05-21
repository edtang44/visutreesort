import React, { useContext } from 'react';
const { UserContext } = require("../context/UserContext");

const TreeDisplay = () => {
  const { displayTree } = useContext(UserContext);
  return (
    <div>
      { displayTree && <h3>TreeDisplay</h3> }
    </div>
  );
}
 
export default TreeDisplay;
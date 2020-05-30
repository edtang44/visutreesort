import React, { useState } from "react";
import * as d3 from "d3";
import SideBarBST from './SideBarBST';
import TreeDisplay from './TreeDisplay';
import '../stylesheets/style.css';

const BSTMainDisplay = () => {

  return (
    <div>
      <SideBarBST />
      <TreeDisplay />
    </div>
  );
}
 
export default BSTMainDisplay;
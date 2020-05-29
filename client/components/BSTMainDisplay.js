import React, { useState } from "react";
import * as d3 from "d3";
import SideBar from './SideBar';
import TreeDisplay from './TreeDisplay';
import '../stylesheets/style.css';

const BSTMainDisplay = () => {

  return (
    <div>
      <SideBar />
      <TreeDisplay />
    </div>
  );
}
 
export default BSTMainDisplay;
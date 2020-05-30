import React from "react";
import * as d3 from "d3";
import '../stylesheets/style.css';
import SideBarSort from "./SideBarSort";
import SortAlgoDisplay from "./SortAlgoDisplay";

const SortMainDisplay = () => {

  return (
    <div>
      <SideBarSort />
      <SortAlgoDisplay />
    </div>
  );
}
 
export default SortMainDisplay;
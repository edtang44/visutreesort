import * as d3 from 'd3';

function removeTree(){
  const currentTree = d3.select('#currentTree');
  if (currentTree) {
    currentTree.remove();
  }
}


export default removeTree;
import React, { useState } from 'react';
import drawSortChart from '../helperfunctions/drawSortChart';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SideBarSort = () => {
  const [numElements, setNumElements] = useState(3);

  function removeChart() {
    const currentChart = document.querySelector('#currentChart');
    if (currentChart) {
      currentChart.remove();
    }
  }

  function handleSubmit(e){
    if (e.target.value > 50) e.target.value = 50;
    if (e.target.value < 3) e.target.value = 3;
    setNumElements(e.target.value);
  }

  function handleDrawSortChart() {
    removeChart();
    drawSortChart(numElements);
  }

  return (
    <div>
      <label htmlFor="numNodes">Number of Elements (3-50)</label>
      <input type="number" name="numElements" value={numElements} min="3" max="50" onChange={(e) => handleSubmit(e)} />
      <Button variant="contained" color="primary" id='create-tree' onClick={() => {handleDrawSortChart()}}>
        Create New Chart
      </Button>
      <div></div>
      <Button variant="contained" color="primary" id='create-tree'>
        Merge Sort
      </Button>
      <Button variant="contained" color="primary" id='create-tree'>
        Insertion Sort
      </Button>
      <Button variant="contained" color="primary" id='create-tree'>
        Selection Sort
      </Button>
      <Button variant="contained" color="primary" id='create-tree'>
        Bubble Sort
      </Button>
      <Button variant="contained" color="primary" id='create-tree'>
        Heap Sort
      </Button>
      <Button variant="contained" color="primary" id='create-tree'>
        Quick Sort
      </Button>
    </div>
  );
}
 
export default SideBarSort;
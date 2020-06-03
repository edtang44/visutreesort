import React, { useState, useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SortAlgoDisplay = () => {
  const [count, setCount] = useState(21);
  const [time, setTime] = useState(2000);
  const [sortDisplay, setSortDisplay] = useState(false);
  const [chartReady, setChartReady] = useState(false);

  let durationTime;
  const array = d3.shuffle(d3.range(1,count));
  let unsortedArray = [...array];
  let sortedArray = [];
  let stop = false;
  let steps = 0;
  let margin = {top: 40, right: 40, bottom: 180, left: 40},
    width = 960 - margin.left - margin.right,
    height = 5000 - margin.top - margin.bottom;
  let barWidth = width/count;
  let x = d3.scaleLinear()
    .domain([0,count])
    .range([0, width]);
  let svg, rects, labels;

  useEffect(() => {
    removeChart();
    durationTime = time/20;
    svg = d3.select("#sortchart").append("svg")
      .attr('id', 'currentChart')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    rects = svg.append("g")
      .attr("transform", "translate(" + barWidth + ",2)")
      .selectAll("rect")
      .data(unsortedArray)
      .enter()
      .append("rect")
    
    labels = svg.selectAll("text")
      .data(unsortedArray)
      .enter().append("text")

      labels.attr("id", function(d) {return "text" + d})
        .attr("transform", function(d, i) {return "translate(" + x(i) + ",0)"})
        .html(function(d) {return d;})
    
      rects.attr("id", function(d) {return "rect" + d})
        .attr("transform", function(d, i) {return "translate(" + (x(i) - barWidth) + ",0)"})
        .attr("width", barWidth *.9)
        .attr("height", function(d) {return d*barWidth/3})
    }, [count, sortDisplay]);

  function reset() {
    unsortedArray = [...array];
    sortedArray = [];
    stop = false;

    d3.select("#counter").html(steps = 0)

    labels.attr("class", "")                
        .transition().duration(2000)
        .attr("transform", function(d, i) {return "translate(" + (x(i)) + ", 0)"})              
    
    rects.attr("class", "")                
        .transition().duration(2000)
        .attr("transform", function(d, i) {return "translate(" + (x(i-1)) + ", 0)"})
  }

  function insertionSort() {
    var value = unsortedArray.shift();
    sortedArray.push(value);      
    reArrange(sortedArray.length-1);

    function reArrange(n) {
        if (stop) return stop = false;            

        d3.selectAll("rect").attr("class", "")                
        d3.select("#rect" + value).attr("class", "testing")
        d3.select("#text" + value).attr("class", "sorted")     
        d3.select("#counter").html(++steps);
        
        if (n > 0 && sortedArray[n-1] > value) {
            d3.timeout(function() {
                sortedArray.splice(n,1);
                sortedArray.splice(n-1,0,value);
                slide(sortedArray[n], n);
                slide(sortedArray[n-1], n-1);
                reArrange(--n)
            }, durationTime * 2);
        } else if (unsortedArray.length) {
            d3.timeout(function() {insertionSort()}, durationTime * 2);
        } else {
            return d3.selectAll("rect").attr("class", "")
          }
    }

  }

  function selectionSort() {
    var min = count,
        spliceIndex,
        i = 0;

    function findMin() {
        if (stop) return stop = false;

        d3.timeout(function() {
        
            if (i<=unsortedArray.length) {

                d3.select("#rect" + unsortedArray[i]).attr("class", "testing")

                d3.timeout(function() {
                    
                    d3.select("#rect" + unsortedArray[i]).attr("class", "")

                    if (unsortedArray[i] < min) {
                        d3.select("#rect" + unsortedArray[i]).attr("class", "min")
                        d3.select("#rect" + min).attr("class", "")
                        min = unsortedArray[spliceIndex = i]
                    }

                    d3.select("#counter").html(++steps);
                    i++;

                    d3.timeout(function() {return findMin()}, durationTime/2);

                }, durationTime/2);

            } else {
                sortedArray.push(min);
                unsortedArray.splice(spliceIndex,1);

                d3.select("#counter").html(++steps);

            rects.transition().duration(durationTime * 4)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal - 1) + ",0)" 
                })

            labels
                .classed("sorted", function(d) {return sortedArray.indexOf(d) == d - 1;})
                .transition().duration(durationTime * 4)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal) + ",0)" 
                })

                rects.attr("class", "")

                d3.timeout(function() {
                    if (unsortedArray.length > 0) selectionSort();
                }, durationTime);
                return;
            }                
        })
    }
    findMin();
  }

  function bubbleSort() {
    var sortedCount = 0;

    function sortPass(i) {
        if (!unsortedArray.length || stop) return stop = false

        if (i<=unsortedArray.length) {
            if (unsortedArray[i] < unsortedArray[i-1]) {

                d3.select("#rect" + unsortedArray[i]).attr("class", "testing")
                d3.select("#rect" + unsortedArray[i-1]).attr("class", "testing")
                
                d3.timeout(function() {
                    d3.select("#rect" + unsortedArray[i]).attr("class", "")
                    d3.select("#rect" + unsortedArray[i-1]).attr("class", "")                                            
                }, durationTime);

                var temp = unsortedArray[i-1];
                unsortedArray[i-1] = unsortedArray[i];
                unsortedArray[i] = temp;

                slide(unsortedArray[i], i + sortedArray);
                slide(unsortedArray[i-1], i-1 + sortedArray);

                d3.select("#counter").html(++steps);

                d3.timeout(function() {return sortPass(++i)}, durationTime);

            } else if (i == unsortedArray.length) {

                for (let n = i; n == unsortedArray[n-1]; n--) {
                    d3.select("#text" + n).attr("class", "sorted")
                    unsortedArray.pop();
                }              

                sortPass(++i);
            } else {               
                sortPass(++i);
            }

        } else {
            bubbleSort();
        }
    }
    sortPass(1);
  }

  function mergeSort() {
    var mergeReps = (unsortedArray.length).toString(2).length + 1;
    var mergeArrays = [[...unsortedArray], []];

    for (let i=0; i<unsortedArray.length; i += 2) {
        mergeArrays[1].push(mergeTwo([unsortedArray[i]], [unsortedArray[i+1]]))
    }
    for (let n=2; n<mergeReps; n++) {
        mergeArrays[n] = [];
        var unMerged = mergeArrays[n-1];
        for (let i=0; i<unMerged.length; i += 2) {
            mergeArrays[n].push(mergeTwo(unMerged[i], unMerged[i+1] ? unMerged[i+1] : []))
        }
    }
    for (let i=1; i<mergeArrays.length; i++) {
        mergeArrays[i] = d3.merge(mergeArrays[i])
    }
    mergeMove(0);

    function mergeTwo(iArray, nArray) {
        var newArray = [];
        for (var i=0, n=0; i<iArray.length || n<nArray.length;) {
            if (iArray[i] < nArray[n]) {
                newArray.push(iArray[i++])
            } else if (iArray[i] > nArray[n]) {
                newArray.push(nArray[n++])
            } else if (!(iArray[i])) {
                newArray.push(nArray[n++])
            } else if (!(nArray[n])) {
                newArray.push(iArray[i++])
            }
        }
        return newArray;
    }

    function mergeMove(j) {
        var oldArray = mergeArrays[j],
            newArray = [...mergeArrays[j+1]],
            sortedArray = [];

        moveStep(0);

        function moveStep(n) {
            if (stop) return stop = false;            
            d3.selectAll("rect").attr("class", "")                

            d3.select("#counter").html(++steps);
            d3.select("#rect" + newArray[n]).attr("class", "testing")

            sortedArray.push(newArray[n])
            oldArray.shift()

            rects.transition().duration(durationTime)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal - 1) + ",0)" 
                })

            labels
                .classed("sorted", function(d) {
                    return !mergeArrays[j + 2] && sortedArray.indexOf(d) == d - 1;
                })
                .transition().duration(durationTime)
                .attr("transform", function(d) {
                    var xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
                    return "translate(" + x(xVal) + ",0)" 
                })

            d3.timeout(function() {
                if (oldArray.length > 0) {
                    moveStep(++n)
                } else if (mergeArrays[j + 2]) {
                    mergeMove(++j)
                } else {
                    rects.classed("testing", false)
                }
            }, durationTime);
        }
    }
  }

  function slide(d, i) {
    d3.select("#text" + d)
        .transition().duration(durationTime)
        .attr("transform", function(d) {return "translate(" + (x(i)) + ", 0)"})

    d3.select("#rect" + d)
        .transition().duration(durationTime)
        .attr("transform", function(d) {return "translate(" + (x(i-1)) + ", 0)"})                
  }

  function removeChart() {
    const currentChart = document.querySelector('#currentChart');
    if (currentChart) {
      currentChart.remove();
    }
  }

  function handleChange(e){
    if (e.target.value > 50) e.target.value = 50;
    if (e.target.value < 3) e.target.value = 3;
    setCount(Number(e.target.value) + 1);
    console.log('count', count)
  }

  function handleChangeSpeed(e){
    setTime(Math.floor(100000/Number(e.target.value)));
    console.log('time', time)
  }

  return (
    <>
    <div>
      <label htmlFor="numNodes">Change Number of Elements in Array (3-50)  </label>
      <input type="number" name="numElements" value={Number(count)- 1} min="3" max="50" onChange={handleChange} />
      <Button variant="contained" color="primary" id='new-chart' 
        onClick={() => {
          setChartReady(true);
          setSortDisplay(true);
          }}>
        New Chart
      </Button>
      <label htmlFor="speed">Speed</label>
      <input type="range" min="10" max="100" id="speed" name="speed" value={100000/time} onChange={handleChangeSpeed}/>
      <Button variant="contained" color="primary" id='stop' onClick={() => {stop = true}}>
        Stop
      </Button>
      <Button variant="contained" color="primary" id='stop' onClick={() => {reset()}}>
        Reset
      </Button>
      <div></div>
      <Button variant="contained" color="primary" id='merge-sort' onClick={chartReady && mergeSort}>
        Merge Sort
      </Button>
      <Button variant="contained" color="primary" id='insertion-sort' onClick={chartReady && insertionSort}>
        Insertion Sort
      </Button>
      <Button variant="contained" color="primary" id='selection-sort' onClick={chartReady && selectionSort}>
        Selection Sort
      </Button>
      <Button variant="contained" color="primary" id='bubble-sort' onClick={chartReady && bubbleSort}>
        Bubble Sort
      </Button>
      <Button variant="contained" color="primary" id='heap-sort'>
        Heap Sort
      </Button>
      <Button variant="contained" color="primary" id='quick-sort'>
        Quick Sort
      </Button>
    </div>
    { sortDisplay && <div id='sortchart'> </div>}
    </>
  );
}
 
export default SortAlgoDisplay;
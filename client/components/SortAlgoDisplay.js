import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
// import Button from '@material-ui/core/Button';
import { Heading, Box, Center, Input, Flex, Square, Text, Button, ButtonGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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
  let margin = {top: 40, right: 0, bottom: 180, left: 250},
    width = 960 - margin.left - margin.right,
    height = 5000 - margin.top - margin.bottom;
  let barWidth = width/count;
  let xScale = d3.scaleLinear()
    .domain([0, count])
    .range([0, width]);
  let svg, rects, labels;

  useEffect(() => {
    removeChart();
    durationTime = time/20;
    displayChart();
    }, [count, sortDisplay, time]);

  function displayChart() {
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
  rects.attr("id", function(d) {return "rect" + d})
    .attr("transform", function(d, i) {return "translate(" + (xScale(i) - barWidth) + ",0)"})
    .attr("width", barWidth *.9)
    .attr("height", function(d) {return d*barWidth/3})

  labels.attr("id", function(d) {return "text" + d})
    .attr("transform", function(d, i) {return "translate(" + xScale(i) + ",0)"})
    .html(function(d) {return d;})
  }

  function reset() {
    unsortedArray = [...array];
    sortedArray = [];
    stop = false;
    d3.select("#counter").html(steps = 0)
    labels.attr("class", "")                
        .transition().duration(2000)
        .attr("transform", function(d, i) {return "translate(" + (xScale(i)) + ", 0)"})              
    rects.attr("class", "")                
        .transition().duration(2000)
        .attr("transform", function(d, i) {return "translate(" + (xScale(i-1)) + ", 0)"})
  }

  function mergeSort() {
    const mergeReps = (unsortedArray.length).toString(2).length + 1;
    const mergeArrays = [[...unsortedArray], []];

    for (let i=0; i<unsortedArray.length; i += 2) {
        mergeArrays[1].push(mergeTwo([unsortedArray[i]], [unsortedArray[i+1]]))
    }
    for (let n=2; n<mergeReps; n++) {
        mergeArrays[n] = [];
        const unMerged = mergeArrays[n-1];
        for (let i=0; i<unMerged.length; i += 2) {
            mergeArrays[n].push(mergeTwo(unMerged[i], unMerged[i+1] ? unMerged[i+1] : []))
        }
    }
    for (let i=1; i<mergeArrays.length; i++) {
        mergeArrays[i] = d3.merge(mergeArrays[i])
    }
    mergeMove(0);

    function mergeTwo(iArray, nArray) {
        const newArray = [];
        for (let i=0, n=0; i<iArray.length || n<nArray.length;) {
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
        const oldArray = mergeArrays[j];
        const newArray = [...mergeArrays[j+1]];
        const sortedArray = [];
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
                    const xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
                    return "translate(" + xScale(xVal - 1) + ",0)" 
                })
            labels
                .classed("sorted", function(d) {
                    return !mergeArrays[j + 2] && sortedArray.indexOf(d) == d - 1;
                })
                .transition().duration(durationTime)
                .attr("transform", function(d) {
                    const xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : oldArray.indexOf(d) + sortedArray.length;
                    return "translate(" + xScale(xVal) + ",0)" 
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

  function insertionSort() {
    const value = unsortedArray.shift();
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
    let min = count;
    let spliceIndex;
    let i = 0;
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
                    const xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                    return "translate(" + xScale(xVal - 1) + ",0)" 
                })
                labels
                  .classed("sorted", function(d) {return sortedArray.indexOf(d) == d - 1;})
                  .transition().duration(durationTime * 4)
                  .attr("transform", function(d) {
                      const xVal = sortedArray.indexOf(d) > -1 ? sortedArray.indexOf(d) : unsortedArray.indexOf(d) + sortedArray.length;
                      return "translate(" + xScale(xVal) + ",0)" 
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
                const temp = unsortedArray[i-1];
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

  function slide(d, i) {
    d3.select("#text" + d)
        .transition().duration(durationTime)
        .attr("transform", function(d) {return "translate(" + (xScale(i)) + ", 0)"})
    d3.select("#rect" + d)
        .transition().duration(durationTime)
        .attr("transform", function(d) {return "translate(" + (xScale(i-1)) + ", 0)"})                
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
      <Flex alignItems="center" justifyContent="center">
      <Text fontSize="xl">Number of Elements (3-50)</Text>
      <Input autoFocus fontSize="xl" width="14" type="number" name="numElements" value={Number(count)- 1} min="3" max="50" onChange={handleChange} />
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6"
        onClick={() => {
          setChartReady(true);
          setSortDisplay(true);
          }}>
        New Chart
      </Button>
      </Flex>
      <label htmlFor="speed">Speed</label>
      <input type="range" min="10" max="100" id="speed" name="speed" value={100000/time} onChange={handleChangeSpeed}/>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={() => {stop = true}}>
        Stop
      </Button>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={() => {reset()}}>
        Reset
      </Button>
      <div></div>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={chartReady && mergeSort}>
        Merge Sort
      </Button>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={chartReady && insertionSort}>
        Insertion Sort
      </Button>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={chartReady && selectionSort}>
        Selection Sort
      </Button>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" onClick={chartReady && bubbleSort}>
        Bubble Sort
      </Button>
      <Button colorScheme="blue" size="lg" variant="outline" spacing="6" as={Link} to="/">
        Main Menu
      </Button>
    </div>
    { sortDisplay && <div alignItems="center" id='sortchart'> </div>}
    </>
  );
}
 
export default SortAlgoDisplay;
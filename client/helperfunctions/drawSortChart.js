import * as d3 from 'd3';

function drawSortChart(num) {
  const count = Number(num) + 1;
  const durationTime = 2000/count;
  const array = d3.shuffle(d3.range(1,count));
  const unsortedArray = [...array];
  const sortedArray = [];
  let stop = false;
  let steps = 0;
  let bogoShuffles = 0;

  const margin = {top: 40, right: 40, bottom: 180, left: 40};
  const width = 960 - margin.left - margin.right;
  const height = 5000 - margin.top - margin.bottom;

  const barWidth = width/count;

  const x = d3.scaleLinear()
  .domain([0,count])
  .range([0, width]);

  const svg = d3.select("#sortchart").append("svg")
  .attr('id', 'currentChart')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const rects = svg.append("g")
  .attr("transform", "translate(" + barWidth + ",2)")
  .selectAll("rect")
  .data(unsortedArray)
  .enter().append("rect")

  const labels = svg.selectAll("text")
  .data(unsortedArray)
  .enter().append("text")

  labels.attr("id", function(d) {return "text" + d})
  .attr("transform", function(d, i) {return "translate(" + x(i) + ",0)"})
  .html(function(d) {return d;})

  rects.attr("id", function(d) {return "rect" + d})
  .attr("transform", function(d, i) {return "translate(" + (x(i) - barWidth) + ",0)"})
  .attr("width", barWidth *.9)
  .attr("height", function(d) {return d*barWidth/3})
}

export default drawSortChart;
import * as d3 from 'd3';

function drawSortChart(num) {
  var count = Number(num) + 1,
  durationTime = 2000/count,
  array = d3.shuffle(d3.range(1,count)),
  unsortedArray = [...array],
  sortedArray = [],
  stop = false,
  steps = 0,
  bogoShuffles = 0;

  var margin = {top: 40, right: 40, bottom: 180, left: 40},
  width = 960 - margin.left - margin.right,
  height = 5000 - margin.top - margin.bottom;

  var barWidth = width/count;

  var x = d3.scaleLinear()
  .domain([0,count])
  .range([0, width]);

  var svg = d3.select("#sortchart").append("svg")
  .attr('id', 'currentChart')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var rects = svg.append("g")
  .attr("transform", "translate(" + barWidth + ",2)")
  .selectAll("rect")
  .data(unsortedArray)
  .enter().append("rect")

  var labels = svg.selectAll("text")
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
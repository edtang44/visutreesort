import * as d3 from 'd3';

function drawTree(ref, data) {
  let margin = {
    top: 80,
    bottom: 80
  };
  let width = 1000;
  let height = 800 - margin.top - margin.bottom;

  let svg = d3.select(ref.current).append("svg")
    .attr('id', 'currentTree')
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", "0 0 1000 1000")
    .append("g")
    .attr("transform", "translate(0," + margin.top + ")");

  let i = 0;
  let duration = 750;

  let treemap = d3.tree().size([width, height + margin-top]);

  let root = d3.hierarchy(data, function(d) {
    return d.children;
  });

  root.x0 = width / 2 ;
  root.y0 = 0;
 
  update(root);

  function update(source) {
    let treeData = treemap(root);
    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);
    nodes.forEach(function (d) {
      d.y = d.depth * 100
    });
    let node = svg.selectAll('g.node')
      .data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });
    let nodeEnter = node.enter().append('g')
      .attr('class', function (d){
        if (isNaN(d.value)){
          return 'hidden'
        } else {
          return 'node'
        }
      })
      .attr('id', function(d){
        let id = `node${d.value}`
        return id;
      })
      .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })
      .on('click', click);

    // Add Circle for the nodes

    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .attr('value', function (d) {
        if (isNaN(d.value)) {
          return "";
        }
        return d.data.value;
      })
      .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
      });

    nodeEnter.append('text')
      .attr('dy', '0')
      .attr('dx', '0')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', "central")
      .attr('value', function(d){
        if (isNaN(d.value)) {
          return "";
        }
        return d.data.value;
      })
      .text(function(d) {
        if (isNaN(d.value)) {
          return "";
        }
        return d.data.value;
      })

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    nodeUpdate.select('circle.node')
      .attr('r', 20)
      .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');

    let nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + source.x + "," + source.y + ")";
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);
 
    nodeExit.select('text')
      .style('fill-opacity', 1e-6)

    let link = svg.selectAll('path.link')
      .data(links, function (d) {
        return d.id;
      });

    let linkEnter = link.enter().insert('path', "g")
      .attr("class", function (d) {
        if (isNaN(d.value)) {
          return "link hidden "
        }
        return "link";
      })

      .attr('d', function (d) {
        let o = {
          x: source.x0,
          y: source.y0
        };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent)
      });

    let linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function (d) {
        let o = {
          x: source.x,
          y: source.y
        };
      })
      .remove();

    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    function diagonal(s, d) {
      const path = `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`

      return path;
    }

    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}

export default drawTree;
// ======= d3 selection => d3 object (stored jQuery object id used for d3 selector string)
svgDisplay = d3.select("#" + $(nextDiv_1c).attr('id'))
  .append("svg")
  .attr("width", 200)
  .attr("height", 180)
  .style("border", "1px solid blue");

// ======= make chipSets from svg rectangles
var chipSet = svgDisplay.selectAll("rect")
  .data(nextDataset)
  .enter()
  .append("rect")
  .attr("width", w)
  .attr("stroke", "black")
  .attr("stroke-width", 1)

  .attr("fill", function(d, j) {
    if (j < 3) {
      nextFill = "red";
    } else {
      nextFill = "teal";
    }
      return nextFill;
  })

  // ======= get X location from locXarray
  .attr("x", function(d, j) {
    nextX = locXarray[j] + 10;
      return nextX;
  })

  // ======= get Y location from locYarray
  .attr("y", function(d, j) {
    if (j < 3) {
      nextY = (locYarray[j] - (d * 3));
    } else {
      nextY = locYarray[j];
    }
      return nextY;
  })

  // ======= set height based on dataset
  .attr("height", function (d) { return (d * 3); });


textDisplay = d3.select("svg").selectAll("text")
  .data(nextDataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", function(d, j) {
    nextX = locXarray[j] + 15;
      return nextX;
  })
  .attr("y", function(d, j) {
    if (j < 3) {
      nextY = (locYarray[j] - (d * 3) - 5);
    } else {
      nextY = locYarray[j] + 15;
    }
      return nextY;
  })
  .attr("fill", function(d, j) {
    if (j < 3) {
      nextFill = "black";
    } else {
      nextFill = "white";
    }
      return nextFill;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px");


gameObject.chipsArray.push(svgDisplay);
svgCount = gameObject.chipsArray.length;
console.log("  svgCount1: " + svgCount);

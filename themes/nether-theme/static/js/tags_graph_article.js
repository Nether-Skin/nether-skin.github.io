document.addEventListener('DOMContentLoaded', (event) => {

  let uniqueKeywords = new Set();

  // gather unique keywords
  document.querySelectorAll('[data-tag]').forEach((element) => {
    const keywords = element.getAttribute('data-tag').split(', ');
    console.log(keywords);
    keywords.forEach(keyword => {
      // If this keyword hasn't been processed yet
      if (!uniqueKeywords.has(keyword)) {
        // Add it to our Set of unique keywords
        uniqueKeywords.add(keyword);      
      };    
    });
  });

  uniqueKeywords = Array.from(uniqueKeywords);

  // create svg
  const svg = d3.select("body")
    .append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .style('position', 'fixed')
    .style('top', 0)
    .style('left', 0)
    .style('z-index', 9999)
    .style('pointer-events', 'none');

  // create points for unique keywords
  const keywordPoints = svg.selectAll(".keywordPoint")
    .data(uniqueKeywords)
    .enter()
    .append("g")
    .attr("id", function(d, i) { return d; })
    .attr("class", "tag-unique-across")
    .append("text")
    .text(function(d, i) { return d; })
    .attr("x", window.innerWidth - 100) // 100px from the right
    .attr("y", (d, i) => i * 30) // 30px spacing
    // .append("circle")
    // .attr("class", "keywordPoint")
    // .attr("id", )
    // .attr("cx", window.innerWidth - 100) // 100px from the right
    // .attr("cy", (d, i) => i * 30) // 30px spacing
    // .attr("r", 5)
    // .attr("fill", "red")
    ;

  let textPoints = [];
  let lines = [];

  // create points for span elements and connect them with unique keyword points
  document.querySelectorAll('[data-tag]').forEach((textualOccurence, index) => {
    const keywords = textualOccurence.getAttribute('data-tag').split(', ');
    const rect = textualOccurence.getBoundingClientRect();

    keywords.forEach((keyword) => {
      const keywordIndex = uniqueKeywords.indexOf(keyword);

      const textPoint = svg.append("circle")
        .attr("class", "textPoint")
        .attr("cx", rect.right)
        .attr("cy", rect.y)
        .attr("r", 5)
        .attr("data-refd-tag", keyword)
        .attr("fill", "blue");
      textPoints.push(textPoint);

      const line = svg.append("line")
        .attr("x1", rect.right)
        .attr("y1", rect.y)
        .attr("x2", window.innerWidth - 100)
        .attr("y2", keywordIndex * 30)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
      lines.push(line);
    });
  });

  const updateVisualization = () => {
    // update positions of spanPoints and lines
    document.querySelectorAll('[data-tag]').forEach((elem, index) => {
      const keywords = elem.getAttribute('data-tag').split(', ');
      const rect = elem.getBoundingClientRect();

      keywords.forEach((keyword, keywordIndex) => {
        // update position of textPoint
        const textPoint = textPoints[index * keywords.length + keywordIndex];
        textPoint
          .attr("cx", rect.right)
          .attr("cy", rect.y);

        // update position of line
        const line = lines[index * keywords.length + keywordIndex];
        line
          .attr("x1", rect.right)
          .attr("y1", rect.y);
      });
    });
  };

  window.addEventListener('resize', updateVisualization);
  window.addEventListener('scroll', updateVisualization);
});
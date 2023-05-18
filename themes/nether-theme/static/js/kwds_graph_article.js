document.addEventListener('DOMContentLoaded', (event) => {

  let uniqueKeywords = new Set();

  // gather unique keywords
  document.querySelectorAll('span.kwd').forEach((span) => {
    const keywords = span.getAttribute('data-kwd').split(' ');
    keywords.forEach((keyword) => uniqueKeywords.add(keyword));
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

  const updateVisualization = () => {
    svg.selectAll("*").remove();

    // create points for unique keywords
    const keywordPoints = svg.selectAll(".keywordPoint")
      .data(uniqueKeywords)
      .enter().append("circle")
      .attr("class", "keywordPoint")
      .attr("cx", window.innerWidth - 100) // 100px from the right
      .attr("cy", (d, i) => i * 30) // 30px spacing
      .attr("r", 5)
      .attr("fill", "red");

    // create points for span elements and connect them with unique keyword points
    document.querySelectorAll('span.kwd').forEach((span, index) => {
      const keywords = span.getAttribute('data-kwd').split(' ');
      const rect = span.getBoundingClientRect();
      
      keywords.forEach((keyword) => {
        const keywordIndex = uniqueKeywords.indexOf(keyword);

        const spanPoint = svg.append("circle")
          .attr("class", "spanPoint")
          .attr("cx", rect.x)
          .attr("cy", rect.y)
          .attr("r", 5)
          .attr("fill", "blue");

        const line = svg.append("line")
          .attr("x1", rect.x)
          .attr("y1", rect.y)
          .attr("x2", window.innerWidth - 100)
          .attr("y2", keywordIndex * 30)
          .attr("stroke", "black")
          .attr("stroke-width", 1);
      });
    });
  };

  updateVisualization();
  
  window.addEventListener('resize', updateVisualization);
});
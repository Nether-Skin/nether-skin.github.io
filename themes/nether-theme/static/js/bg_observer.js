document.addEventListener("DOMContentLoaded", function() {
  var sections = document.querySelectorAll("section.content_section");
  var body = document.body;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        body.className = '';
        body.classList.add(`bg-${entry.target.id}`);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    observer.observe(section);
  });
});

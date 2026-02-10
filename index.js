
const resizers = document.querySelectorAll(".resizer");

let isDragging = false;
let currentResizer;
let startX;
let startWidth;

resizers.forEach(resizer => {
  resizer.addEventListener("mousedown", e => {
    isDragging = true;
    currentResizer = resizer;
    startX = e.clientX;

    const prev = resizer.previousElementSibling;
    const next = resizer.nextElementSibling;

    startWidth = prev.offsetWidth;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});

function onMouseMove(e) {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  const prev = currentResizer.previousElementSibling;
  const next = currentResizer.nextElementSibling;

  const newWidth = startWidth + dx;

  if (newWidth > 150) {
    prev.style.width = newWidth + "px";
  }
}

function onMouseUp() {
  isDragging = false;
  document.body.style.cursor = "default";
  document.body.style.userSelect = "auto";

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}


const content = document.getElementById('content');
const sections = document.querySelectorAll('.topic');
const tocLinks = document.querySelectorAll('#toc a');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        tocLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  {
    root: content,     // 👈 VERY IMPORTANT (scrollable panel)
    threshold: 0.5     // section is active when 50% visible
  }
);

sections.forEach(section => observer.observe(section));


function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("active");
}
/* const svg = document.querySelector("svg.squiggle");
const path = svg.querySelector("path");

const scroll = () => {
  const distance = window.scrollY;
  const totalDistance = svg.clientHeight - window.innerHeight;

  const percentage = distance / totalDistance;

  const pathLength = path.getTotalLength();

  path.style.strokeDasharray = `${pathLength}`;
  path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
};

scroll();
window.addEventListener("scroll", scroll); */

/* Code version for multiple paths */
/* const svg = document.querySelector("svg.squiggle");
const paths = svg.querySelectorAll("path");
console.log(paths);

const scroll = () => {
  const distance = window.scrollY;
  const totalDistance = svg.clientHeight - window.innerHeight;
  const percentage = distance / totalDistance;

  for (var i = 0; i < paths.length; i++) {
    let path = paths[i];
    //console.log(path);
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
  }
};

scroll();
window.addEventListener("scroll", scroll); */

/* Version 3 */
/* const svg = document.querySelector("svg.squiggle");
const paths = svg.querySelectorAll("path");

const scroll = () => {
  const distance = window.scrollY;
  const totalDistance = svg.clientHeight - window.innerHeight;
  const percentage = distance / totalDistance / 2; // Adjust the factor to slow down the animation

  for (var i = 0; i < paths.length; i++) {
    let path = paths[i];
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
  }
};

scroll();
window.addEventListener("scroll", scroll); */

/* Version 4 */
/* squiggle animation: adjust size and draw on scroll */
const svg = document.querySelector("svg.squiggle");
if (svg) {
  const path = svg.querySelector("path");
  let renderedLen = 0; // cached length after scaling

  function updateSquiggle() {
    // determine ending Y coordinate (bottom of footer) so the svg only spans to the page end we care about
    const footer = document.querySelector("footer");
    const pageEnd = footer ? footer.offsetTop + footer.offsetHeight : Math.max(document.documentElement.scrollHeight, window.innerHeight);

    svg.setAttribute("height", pageEnd);
    svg.style.height = pageEnd + "px";

    // compute scale factor via viewBox (if present) using the new svg height
    const vb = svg.viewBox.baseVal;
    const scale = vb && vb.height ? svg.getBoundingClientRect().height / vb.height : 1;

    const rawLen = path.getTotalLength();
    renderedLen = rawLen * scale;

    path.style.strokeDasharray = renderedLen;
    path.style.strokeDashoffset = renderedLen; // start fully hidden
  }

  function updateOnScroll() {
    const distance = window.scrollY;
    // use the same pageEnd value we set above for height
    const footer = document.querySelector("footer");
    const pageEnd = footer ? footer.offsetTop + footer.offsetHeight : svg.getBoundingClientRect().height;

    const total = pageEnd - window.innerHeight;
    // if we haven't computed a length yet (e.g. layout wasn't ready), try again
    if (!renderedLen) {
      const rawLen = path.getTotalLength();
      const vb = svg.viewBox.baseVal;
      const scale = vb && vb.height ? svg.getBoundingClientRect().height / vb.height : 1;
      renderedLen = rawLen * scale;
      path.style.strokeDasharray = renderedLen;
      path.style.strokeDashoffset = renderedLen;
    }

    // delay the start of the animation by a small fraction of the scroll range
    const startFraction = 0.1; // 10% into the page
    const startOffset = total * startFraction;
    let effectiveDistance = distance - startOffset;
    if (effectiveDistance < 0) effectiveDistance = 0;

    // control how quickly the squiggle draws. larger than 1 slows animation.
    const scrollFactor = 2; // tweak this value as needed
    let rawPct = effectiveDistance / (total - startOffset) / scrollFactor;

    // reverse occurs naturally as distance decreases on scroll up
    rawPct = Math.min(Math.max(rawPct, 0), 1);

    // easing: slow start, quicker toward the end
    const pct = Math.pow(rawPct, 0.5);

    path.style.strokeDashoffset = renderedLen * (1 - pct);
  }

  // wrap scroll handler in rAF for better performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  }

  // run sizing & initial offset after the browser has painted
  window.addEventListener("load", () => {
    window.requestAnimationFrame(() => {
      updateSquiggle();
      updateOnScroll();
    });
  });

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(() => {
      updateSquiggle();
      updateOnScroll();
    });
  });

  window.addEventListener("scroll", onScroll);
}

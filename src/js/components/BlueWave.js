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
const svg = document.querySelector("svg.squiggle");
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
window.addEventListener("scroll", scroll);

// Used for making sure 100vw doesn't overflow horizontally
// Keywords : Horizontal Overflow
function setVw() {
  let vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

setVw();
window.addEventListener('resize', setVw);
// Used for making sure 100vw doesn't overflow horizontally

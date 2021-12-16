// For quote API
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
// For Hiding/Diplaying Festival stuff
const festCon = document.getElementById('festival-container');
const annCon = document.getElementById('ann-container');
// For the navbar
const navTitle = document.getElementById('brand-con');
const navOptionCon = document.getElementById('nav-link-con');
const navButton = document.getElementById('nav-btn');
const navOptions = document.querySelector('.nav-links');

// Used for making sure 100vw doesn't overflow horizontally
// Keywords : Horizontal Overflow
function setVw() {
  let vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

setVw();
window.addEventListener('resize', setVw);
// Used for making sure 100vw doesn't overflow horizontally

// Quotale API
async function getQuote() {
  const apiUrl = 'https://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = '- ' + data.author;
    }

    //Reduce font size for long quotes
    if (data.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.content;
  } catch (error) {
    getQuote();

  }
}

getQuote();

// For when non festival
festCon.hidden = false;
if (festCon.hidden) {
  annCon.classList.add('annConCoverup');
}

// Navbar toggler
function loadNavBar() {
  if (navTitle.classList.contains('visible')) {
    navOptions.classList.add('hide');
    navTitle.classList.remove('visible');
    navOptionCon.classList.remove('visible');
  } else {
    navTitle.classList.add('visible');
    navOptions.classList.remove('hide');
    navOptionCon.classList.add('visible');
  }
}

navOptions.classList.remove('hide');
navButton.addEventListener("click", loadNavBar);

// Hide navbar on scroll
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-6.9rem";
    navTitle.classList.remove('visible');
    navOptions.classList.add('hide');
    navOptionCon.classList.remove('visible');
  }
  prevScrollpos = currentScrollPos;
}

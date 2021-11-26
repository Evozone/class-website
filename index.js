const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');

// Used for making sure 100vw doesn't overflow horizontally
// Keywords : Horizontal Overflow
function setVw() {
  let vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

setVw();
window.addEventListener('resize', setVw);
// Used for making sure 100vw doesn't overflow horizontally



// API
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

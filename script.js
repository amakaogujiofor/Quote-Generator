// Display Quotes
const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const quoteUrl = "https://myquote-generator.netlify.app/";
const loader = document.getElementById("loader");

// API Quotes
let apiQuotes = [];

// Loading Function
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loader
function complete() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

// Show New Quotes
function newQuotes() {
  //   loading();
  // Get Random Quotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Replace Author field if blank
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //   Long Quote Style
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote and hide loader
  quoteText.textContent = quote.text;
  //   complete();
}

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    //   Catch Error Here
    alert("Help, error");
  }
}

// Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} 
  - 
  ${authorText.textContent}
  
 From ${quoteUrl} by @amakaogujiofor`;
  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuotes);

// On load
getQuotes();

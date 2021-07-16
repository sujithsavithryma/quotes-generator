const apiUrl = 'https://type.fit/api/quotes';
let apiQuotes = [];

const quotesContainerRef = getElement('quotes-container');
const quoteRef = getElement('quote');
const authorRef = getElement('author');
const twitterRef = getElement('twitter');
const newQuoteRef = getElement('new-quote');
const loadingRef = getElement('loading');

async function getQuotes() {
    try {
        showLoader();
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(err) {
        console.error(err);
    }
}

function getElement(id) {
    return document.querySelector(`#${id}`);
}

function newQuote() {
    if (apiQuotes.length) {
        showLoader();
        renderQuote(apiQuotes[Math.floor(Math.random() * apiQuotes.length)]);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteRef.textContent} - ${authorRef.textContent}`;
    window.open(twitterUrl, '_blank');
}

function renderQuote(quote) {
    if (quote) {
        const author = quote.author ? quote.author : 'Unknown';
        quoteRef.textContent = quote.text;
        authorRef.textContent = author;
    }
    closeLoader();
}

function showLoader() {
    loadingRef.hidden = false;
    quotesContainerRef.hidden = true;
}

function closeLoader() {
    loadingRef.hidden = true;
    quotesContainerRef.hidden = false;
}

getQuotes();

newQuoteRef.addEventListener('click', newQuote);
twitterRef.addEventListener('click', tweetQuote);
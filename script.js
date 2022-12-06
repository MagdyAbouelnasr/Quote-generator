const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');

const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}

// hide loading

function complete(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}


//Get qoute from api
async function getQuote(){
    loading();
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    // const apiUrl = 'https://zenquotes.io/api/quotes'
    try {

        const response = await fetch( apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length >100){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //stop loader and show quote
        complete();

    } catch (error) {
        getQuote();
        console.log('no qoute',error);
    }

}


function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
    
}

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on load
getQuote();



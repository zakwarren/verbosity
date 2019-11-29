const Scraper = require('./tools/scraper');

const mainUrl = 'http://dominicwarren.com/';
const urlSuffix = '.html';
const pageBody = '#wrapper';

const analyzeWords = words => {
    if (words) {
        console.log('Words found: ' + words.length);
    }
};

const myScraper = new Scraper(mainUrl);
myScraper.scrapeSite(analyzeWords);

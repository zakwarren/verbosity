const Scraper = require('./tools/scraper');
const WordAnalyzer = require('./tools/word-analyzer');

const mainUrl = 'http://dominicwarren.com/';
const urlSuffix = '.html';
const pageBody = '#wrapper';

const analyzeWords = words => {
    if (words) {
        const analyze = new WordAnalyzer(words);
        analyze.analyze();
        console.log(analyze.analysis);
    }
};

//const myScraper = new Scraper(mainUrl, urlSuffix, pageBody);
//myScraper.scrapeSite(analyzeWords);

const words = ['a', 'a', 'b', 'c', 'a', 'b', 'a', 'd'];
const analyze = new WordAnalyzer(words);
analyze.analyze();
console.log(analyze.analysis);

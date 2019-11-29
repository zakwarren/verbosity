const Scraper = require('./tools/scraper');

const mainUrl = 'http://dominicwarren.com/';
const urlSuffix = '.html';
const pageBody = '#wrapper';

const myScraper = new Scraper(mainUrl, urlSuffix, pageBody);
myScraper.scrapeSite();

const rp = require('request-promise');
const cheerio = require('cheerio');

class Scraper {
    constructor(mainUrl, urlSuffix, pageBody) {
        this.mainUrl = mainUrl;
        this.urlSuffix = urlSuffix;
        this.pageBody = pageBody;
        this.siteText = [];
        this.siteLinks = [];
    }

    extractText($) {
        return $(this.pageBody)
            .text()
            .replace(/\s\s+/g, ' ')
            .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    };

    extractLinks($) {
        $('a')
            .each((i, element) => {
                let link = $(element).attr('href');
                if (!link.includes('http') || link.includes(this.mainUrl)) {
                    if (!link.includes(this.urlSuffix)) {
                        link += this.urlSuffix;
                    }
                    if (link.charAt(0) === '/') {
                        link = link.substr(1, link.length);
                    }
                    if (!this.siteLinks.includes(link)) {
                        this.siteLinks.push(link);
                    }
                }
            });
    };

    splitWords(text) {
        const txtArr = text.split(' ');
        txtArr.forEach(word => {
            this.siteText.push(word);
        });
    };

    scrapeSite() {
        rp({ url: mainUrl })
            .then(html => {
                const $ = cheerio.load(html);
                this.extractLinks($);
                return this.extractText($);
            })
            .then(pageText => {
                this.splitWords(pageText);
                return;
            })
            .then(() => {
                console.log('Words found: ' + this.siteText.length);
            })
            .catch(err => console.log(err));
        };
};


const mainUrl = 'http://dominicwarren.com/';
const urlSuffix = '.html';
const pageBody = '#wrapper';

const myScraper = new Scraper(mainUrl, urlSuffix, pageBody);
myScraper.scrapeSite();

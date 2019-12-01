const rp = require('request-promise');
const cheerio = require('cheerio');

class Scraper {
    constructor(mainUrl, pageBody) {
        this.mainUrl = mainUrl;
        this.pageBody = pageBody || 'body';
        this.siteTitle = '';
        this.siteText = '';
        this.siteWords = [];
        this.siteLinks = [mainUrl];
        this.linksToScrape = [mainUrl];
    }

    deviseErrorPage(mainUrl) {
        const err = '404.html';
        if (mainUrl[mainUrl.length -1] !== '/') {
            return mainUrl + '/' + err;
        } else {
            return mainUrl + err;
        }
    }

    extractTitle($) {
        if (!this.siteTitle.length > 0) {
            this.siteTitle = $('title').text();
        }
    };

    extractText($) {
        return $(this.pageBody)
            .text()
            .replace(/\s\s+/g, ' ')
            .replace(/[.,"'’\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    };

    extractLinks($) {
        $('a')
            .each((i, element) => {
                let link = $(element).attr('href');
                if (link) {
                    if (!link.includes('http') || (
                            link.includes(this.mainUrl)
                            && link !== this.mainUrl
                    )) {
                        if (link.charAt(0) === '/' && link[link.length -1] !== '/') {
                            link = link.substr(1, link.length);
                        }

                        if (!link.includes(this.mainUrl)) {
                            link = this.mainUrl + link;
                        }

                        if (!this.siteLinks.includes(link)) {
                            this.siteLinks.push(link);
                            this.linksToScrape.push(link);
                        }
                    }
                }
            });
    };

    splitWords(text) {
        const txtArr = text.split(' ');
        txtArr.forEach(word => {
            if (word.length > 0) {
                this.siteWords.push(word);
            }
        });
    };

    scrapeSite(cb) {
        let url = this.linksToScrape.pop();
        rp({ url: url }, cb)
            .then(html => {
                const $ = cheerio.load(html);
                this.extractTitle($);
                this.extractLinks($);
                return this.extractText($);
            })
            .then(pageText => {
                this.siteText += ' ' + pageText;
                this.splitWords(pageText);
                return;
            })
            .then(() => {
                if (this.linksToScrape.length > 0) {
                    this.scrapeSite(cb);
                } else if (cb) {
                    cb(this.siteTitle, this.siteWords, this.siteText);
                }
            })
            .catch(err => console.log(err));
        };
};

module.exports = Scraper;

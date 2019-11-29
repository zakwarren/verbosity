const rp = require('request-promise');
const cheerio = require('cheerio');

class Scraper {
    constructor(mainUrl, urlSuffix, pageBody) {
        this.mainUrl = mainUrl;
        this.urlSuffix = urlSuffix || '';
        this.pageBody = pageBody || 'body';
        this.siteText = [];
        this.siteLinks = [mainUrl, this.deviseErrorPage(mainUrl)];
        this.linksToScrape = [mainUrl, this.deviseErrorPage(mainUrl)];
    }

    deviseErrorPage(mainUrl) {
        const err = '404.html';
        if (mainUrl[mainUrl.length -1] !== '/') {
            return mainUrl + '/' + err;
        } else {
            return mainUrl + err;
        }
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
                if (link) {
                    if (!link.includes('http') || (
                            link.includes(this.mainUrl)
                            && link !== this.mainUrl
                    )) {
                        if (!link.includes(this.urlSuffix)) {
                            link += this.urlSuffix;
                        }
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
            this.siteText.push(word);
        });
    };

    scrapeSite(cb) {
        let url = this.linksToScrape.pop();
        rp({ url: url }, cb)
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
                if (this.linksToScrape.length > 0) {
                    this.scrapeSite(cb);
                } else if (cb) {
                    cb(this.siteText);
                }
            })
            .catch(err => console.log(err));
        };
};

module.exports = Scraper;

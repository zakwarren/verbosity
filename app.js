const rp = require('request-promise');
const cheerio = require('cheerio');

const mainUrl = 'http://dominicwarren.com/';
const urlSuffix = '.html';
const pageBody = '#wrapper';

const siteText = [];
const siteLinks = [];

const scrapeText = $ => {
    return $(pageBody)
        .text()
        .replace(/\s\s+/g, ' ')
        .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
};

const scrapeLinks = $ => {
    $('a')
        .each((i, element) => {
            let link = $(element).attr('href');
            if (!link.includes('http') || link.includes(mainUrl)) {
                if (!link.includes(urlSuffix)) {
                    link += urlSuffix;
                }
                if (link.charAt(0) === '/') {
                    link = link.substr(1, link.length);
                }
                if (!siteLinks.includes(link)) {
                    siteLinks.push(link);
                }
            }
        });
};

const scrapePage = html => {
    const $ = cheerio.load(html);
    scrapeLinks($);
    return scrapeText($);
};

const extractWords = text => {
    const txtArr = text.split(' ');
    txtArr.forEach(word => {
        siteText.push(word);
    });
};

rp({ url: mainUrl })
    .then(html => {
        return scrapePage(html);
    })
    .then(pageText => {
        extractWords(pageText);
        return;
    })
    .then(() => {
        console.log('Words found: ' + siteText.length);
    })
    .catch(err => console.log(err));

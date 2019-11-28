const rp = require('request-promise');
const cheerio = require('cheerio');

const mainUrl = 'http://dominicwarren.com/';
const urlSuffix = '.html';

const siteText = [];
const siteLinks = [];

const scrapePage= (html) => {
    const $ = cheerio.load(html);

    const pageText = $('#wrapper')
                    .text()
                    .replace(/\s\s+/g, ' ')
                    .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
    
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

    return pageText;
};

rp({ url: mainUrl })
    .then(html => {
        return scrapePage(html);
    })
    .then(pageText => {
        const txtArr = pageText.split(' ');
        txtArr.forEach(word => {
            siteText.push(word);
        });
        console.log(siteText);
    })
    .catch(err => console.log(err));

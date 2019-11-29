const Scraper = require('../tools/scraper');
const WordAnalyzer = require('../tools/word-analyzer');
const wordData = require('../data/words');


exports.getHome = (req, res, next) => {
    res.render(
        'main/index',
        {
            pageTitle: 'Verbosity',
            path: '/'
        }
    );
};

exports.getAbout = (req, res, next) => {
    res.render(
        'main/about',
        {
            pageTitle: 'About Verbosity',
            path: '/about',
            stopWords: wordData.stopWords
        }
    );
};

exports.postAnalysis = (req, res, next) => {
    const url = req.body.url;
    const urlSuffix = req.body.urlSuffix;

    const analyzeWords = words => {
        if (words) {
            const analyze = new WordAnalyzer(words);
            analyze.analyze();

            res.render(
                'main/analysis',
                {
                    pageTitle: 'Word Analysis',
                    path: '/analysis',
                    urlAnalyzed: url,
                    analysis: analyze.analysis
                }
            );
        }
    };
    
    const myScraper = new Scraper(url, urlSuffix);
    myScraper.scrapeSite(analyzeWords);
};

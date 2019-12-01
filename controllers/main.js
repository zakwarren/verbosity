const MarkovChain = require('markovchain');

const Scraper = require('../tools/scraper');
const WordAnalyzer = require('../tools/word-analyzer');
const wordData = require('../data/words');

const blogLength = 1000;


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

    if (!url) {
        res.redirect(302, '/');
    }

    const analyzeWords = (title, words, textCorpus) => {
        if (title && words) {
            const analyze = new WordAnalyzer(title, words);
            analyze.analyze();

            const randomStartWord = words[
                Math.floor(Math.random() * words.length)
            ];
            const blogSource = new MarkovChain(textCorpus);
            const blog = blogSource.start(randomStartWord)
                                    .end(blogLength)
                                    .process();

            res.render(
                'main/analysis',
                {
                    pageTitle: 'Word Analysis',
                    path: '/analysis',
                    urlAnalyzed: url,
                    siteTitle: analyze.title,
                    analysis: analyze.analysis,
                    generatedBlog: blog
                }
            );
        }
    };
    
    const myScraper = new Scraper(url);
    myScraper.scrapeSite(analyzeWords);
};

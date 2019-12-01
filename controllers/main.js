const MarkovChain = require('markovchain');

const Scraper = require('../tools/scraper');
const WordAnalyzer = require('../tools/word-analyzer');
const wordData = require('../data/words');

const titleLength = 10;
const blogLength = 1000;


exports.getHome = (req, res, next) => {
    res.render(
        'main/index',
        {
            pageTitle: 'Verbosity',
            path: '/',
            error: false
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

    const handleErrors = error => {
        res.render(
            'main/index',
            {
                pageTitle: 'Verbosity',
                path: '/',
                error: true
            }
        );
    };

    const analyzeWords = (title, words, textCorpus) => {
        if (title && words) {
            const analyze = new WordAnalyzer(title, words);
            analyze.analyze();

            const blogSource = new MarkovChain(textCorpus);

            const randomTitleWord = words[
                Math.floor(Math.random() * words.length)
            ];
            const blogTitle = blogSource.start(randomTitleWord)
                                        .end(titleLength)
                                        .process();

            const randomStartWord = words[
                Math.floor(Math.random() * words.length)
            ];
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
                    generatedTitle: blogTitle.charAt(0).toUpperCase() + blogTitle.slice(1),
                    generatedBlog: blog.charAt(0).toUpperCase() + blog.slice(1)
                }
            );
        }
    };
    
    const myScraper = new Scraper(url);
    myScraper.scrapeSite(analyzeWords, handleErrors);
};

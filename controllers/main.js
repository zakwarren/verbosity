const { validationResult } = require('express-validator');

const Scraper = require('../tools/scraper');
const WordAnalyzer = require('../tools/word-analyzer');
const blogWriter = require('../tools/blog-writer');
const wordData = require('../data/words');

const titleLength = 10;
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array()[0].msg;
        throw error;
    }

    const handleErrors = (error, htmlCode) => {
        htmlCode = htmlCode || 500;
        res.status(htmlCode).json({
            message: 'Error'
        });
    };

    const analyzeWords = (title, words, textCorpus) => {
        if (title && words) {
            const analyze = new WordAnalyzer(title, words);
            analyze.analyze(wordData.stopWords);

            const blogObj = blogWriter.writeBlog(textCorpus, words, titleLength, blogLength);

            res.status(200).json({
                message: 'Success',
                urlAnalyzed: url,
                siteTitle: analyze.title,
                analysis: analyze.analysis,
                generatedTitle: blogObj.blogTitle,
                generatedBlog: blogObj.blogContent
            });
        }
    };

    if (!errors.isEmpty()) {
        return handleErrors(errors, 422);
    }
    
    const myScraper = new Scraper(url);
    myScraper.scrapeSite(analyzeWords, handleErrors);
};

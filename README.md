# Verbosity: The Website Word Analyzer

This web app takes in a URL and attempts to scrape all
the words from the website it points to. It then analyses
these words and presents it back to you.

Before analysing the word list, it cleans out all the (English)
stop words. Stop words are some of the most common words used in
the language and don't necessarily hold meaning on their own, but
help understanding by joining meaningful words together into
coherent sentences.

As part of the analysis of the website, this web app generates
a blog using the words it finds. This blog uses Markov Chains,
which analyse the frequency that words appear in a sample
(known as a corpus) to inform its probability model. The more
words in the model, the more accurate it can become.

The web app supplies a random word from the corpus to seed the blog.
It then selects the next word based on the probability of the words
that tend to follow this word in the source material. It does this
sequentially until it reaches the defined limit or runs out of likely
following words.

This form of computer generated text is based purely on the frequency
of word use by the author of the source material. It doesn't attempt
to produce sentences with any deeper meaning, so can often produce
text that is difficult to read or obviously random.

## Quick start

Before running Verbosity, install the dependencies using:

```bash
npm install
```

Once all the dependencies are successfully installed, run:

```bash
npm start
```

## Tools

There are two files in the tools directory that can be used
indepently from the rest of this application. These are:

* scraper.js (containing the Scraper class)
* word-analyzer.js (containing the WordAnalyzer class and its
dependency, the analysis class)

### Scraper

The Scraper class takes in a URL, connects to the website and
scrapes all the pages, and returns all the words it finds. Pass
in the URL when creating the new Scraper object. You can also
pass in an optional body argument, which tells the scraper what
part of the HTML document to focus on. For example, 'body'
searches everything in the body tag and '#main' searches everything
in the first element it finds with an ID of 'main'.

To scrape a website, call the scrapeSite method and pass in a
callback and an optional error handling callback. Example usage:

```javascript
const WebScraper = require('./path/to/Scraper');

const url = 'http://www.example.com/';

const logWords = (title, words, textCorpus) => {
    if (title && words) {
        console.log(title + ': ' + words);
    }
};

const logErrors = (error, htmlStatusCode) => {
    console.log(error);
};

const myScraper = new WebScraper(url);
myScraper.scrapeSite(logWords, logErrors);
```

### WordAnalyzer

The WordAnalyzer class takes in a title and an array of words
and returns various analytics about these words. To analyse the
words, call the analyze method. To exclude stop words, pass in an
array of stop words to the analyze method. You can then access the
results by calling the object's analysis parameter. Example usage:

```javascript
const WordAnalyzer = require('./path/to/word-analyzer');
const wordData = require('./path/to/stop-words');

const title = 'Words';
const words = ['a', 'a', 'b', 'c', 'a', 'b', 'a', 'd', 'the', 'test', "i", "I"];

const analyze = new WordAnalyzer(title, words);
analyze.analyze(wordData.stopWords);

console.log(analyze.analysis);
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details
on our code of conduct.

## Authors

* **Zak Warren** - *Initial work*

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details.

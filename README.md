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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details
on our code of conduct.

## Authors

* **Zak Warren** - *Initial work*

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details.

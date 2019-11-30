const wordData = require('../data/words');


class analysis {
    constructor(totalWords, mostUsedWord, mostUses, topTenWords, topHundredWords) {
        this.totalWords = totalWords || 0;
        this.mostUsedWord = mostUsedWord || '';
        this.mostUses = mostUses || 0;
        this.topTenWords = topTenWords || [];
        this.topHundredWords = topHundredWords || topTenWords || [];
    }
}


class WordAnalyzer {
    constructor(words) {
        this.words = words || [];
        this.wordCount = {};
        this.analysis = {};
    }

    cleanWordList() {
        const wordList = [];
        this.words.forEach(word => {
            const capitalWord = word.toUpperCase();
            let isStopWord = false;
            wordData.stopWords.forEach(stopWord => {
                if (capitalWord === stopWord.toUpperCase()) {
                    isStopWord = true;
                }
            });
            if (!isStopWord) {
                wordList.push(word);
            }
        });
        this.words = wordList;
    }

    countWords() {
        this.words.forEach(word => {
            if (this.wordCount[word]) {
                this.wordCount[word] += 1;
            } else {
                this.wordCount[word] = 1;
            }
        });
    }

    getMostUsedWord(wordCountList) {
        return Object.keys(wordCountList)
                    .reduce((a, b) => {
                        if (wordCountList[a] > wordCountList[b]) {
                            return a;
                        } else {
                            return b;
                        }
                    });
    }

    getTopWords(numberWords) {
        const topWords = [];
        const wordCountCopy = JSON.parse(JSON.stringify(this.wordCount));
        const lengthOfWordCount = Object.keys(wordCountCopy).length;

        if (lengthOfWordCount < numberWords) {
            numberWords = lengthOfWordCount;
        }

        let word = '';
        let uses = 0;
        let wrdObj = {};
        for (let i = 0; i < numberWords; i++) {
            word = this.getMostUsedWord(wordCountCopy);
            uses = wordCountCopy[word];
            wrdObj = {"word": word, "uses": uses};
            topWords.push(wrdObj);
            delete wordCountCopy[word];
        }

        return topWords;
    }

    analyze() {
        this.cleanWordList();
        this.countWords();
        const totalWords = this.words.length;
        const mostUsedWord = this.getMostUsedWord(this.wordCount);
        const mostUses = this.wordCount[mostUsedWord];
        const topTenWords = this.getTopWords(10);
        const topHundredWords = this.getTopWords(100);

        this.analysis = new analysis(
            totalWords,
            mostUsedWord,
            mostUses,
            topTenWords,
            topHundredWords
        );
    }
}

module.exports = WordAnalyzer;

const wordData = require('../data/words');


class analysis {
    constructor(totalWords, mostUsedWord, mostUses) {
        this.totalWords = totalWords || 0;
        this.mostUsedWord = mostUsedWord || '';
        this.mostUses = mostUses || 0;
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

    getMostUsedWord() {
        return Object.keys(this.wordCount)
                    .reduce((a, b) => {
                        if (this.wordCount[a] > this.wordCount[b]) {
                            return a;
                        } else {
                            return b;
                        }
                    });
    }

    analyze() {
        this.cleanWordList();
        this.countWords();
        const totalWords = this.words.length;
        const mostUsedWord = this.getMostUsedWord();
        const mostUses = this.wordCount[mostUsedWord];

        this.analysis = new analysis(totalWords, mostUsedWord, mostUses);
    }
}

module.exports = WordAnalyzer;

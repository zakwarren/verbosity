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
        this.countWords();
        const totalWords = this.words.length;
        const mostUsedWord = this.getMostUsedWord();
        const mostUses = this.wordCount[mostUsedWord];

        this.analysis = new analysis(totalWords, mostUsedWord, mostUses);
    }
}

module.exports = WordAnalyzer;

class WordAnalyzer {
    constructor(words) {
        this.words = words || [];
        this.TotalWords = words.length;
        this.wordCount = {};
    }

    CountWords() {
        this.words.forEach(word => {
            if (this.wordCount[word]) {
                this.wordCount[word] += 1;
            } else {
                this.wordCount[word] = 1;
            }
        });
    }
}

module.exports = WordAnalyzer;

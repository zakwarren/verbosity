const WordAnalyzer = require('./tools/word-analyzer');

const title = 'Words';
const words = ['a', 'a', 'b', 'c', 'a', 'b', 'a', 'd', 'the', 'test', "i", "I"];
const analyze = new WordAnalyzer(title, words);
analyze.analyze();

console.log(analyze.analysis);

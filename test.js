const WordAnalyzer = require('./tools/word-analyzer');

const words = ['a', 'a', 'b', 'c', 'a', 'b', 'a', 'd', 'the', 'test', "i", "I"];
const analyze = new WordAnalyzer(words);
analyze.analyze();
analyze.getTopWords(10);

console.log(analyze.analysis);

const MarkovChain = require('markovchain');

exports.writeBlog = (textCorpus, listOfSeedWords, titleLength, blogLength) => {
    titleLength = titleLength || 10;
    blogLength = blogLength || 1000;
    const blogSource = new MarkovChain(textCorpus);

    const randomTitleWord = listOfSeedWords[
        Math.floor(Math.random() * listOfSeedWords.length)
    ];
    const blogTitle = blogSource.start(randomTitleWord)
                                .end(titleLength)
                                .process();

    const randomStartWord = listOfSeedWords[
        Math.floor(Math.random() * listOfSeedWords.length)
    ];
    const blogContent = blogSource.start(randomStartWord)
                                .end(blogLength)
                                .process();

    return {
        blogTitle: blogTitle.charAt(0).toUpperCase() + blogTitle.slice(1),
        blogContent: blogContent.charAt(0).toUpperCase() + blogContent.slice(1)
    };
};

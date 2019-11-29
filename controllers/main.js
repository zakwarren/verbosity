exports.getHome = (req, res, next) => {
    res.render(
        'main/index',
        {
            pageTitle: 'Verbosity',
            path: '/'
        }
    );
};

exports.postAnalysis = (req, res, next) => {
    res.render(
        'main/analysis',
        {
            pageTitle: 'Word Analysis',
            path: '/analysis'
        }
    );
};

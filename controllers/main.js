exports.getHome = (req, res, next) => {
    res.render(
        'main/index',
        {
            pageTitle: "Verbosity",
            path: '/'
        }
    );
};

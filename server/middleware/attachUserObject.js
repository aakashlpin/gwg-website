module.exports = function attachUserObject () {
    return function (req, res, next) {
        if (req.user) {
            req.rendrApp.set('user', req.user);

        }
        next();
    }
};
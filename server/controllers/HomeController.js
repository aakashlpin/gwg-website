module.exports = {
    getIndex: function(req, res) {
        res.render('home');
    },
    getGuruIndex: function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/g/schedule');

        } else {
            res.render('guru_home');
        }
    },
    getAbout: function(req, res) {
        res.render('about');

    },
    logOutHandler: function(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/g');

    }
};
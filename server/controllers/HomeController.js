var models = require('../models');

module.exports = {
    getIndex: function(req, res) {
        res.render('home');
    },
    get404: function(req, res) {
        res.render('404');
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

    },
    validateUserNameRoute: function(req, res, next) {
        //middleware to test if the incoming request has a valid route
        //url would be something like guitarwith.guru/mikey
        //take out the param and test for user in the database
        //TODO allow changing the username by the user
        var param = req.params.username;
        var GuruModel = models.Guru;
        GuruModel.getByUserName(param, function(err, guruRecord) {
            if (err || !guruRecord) {
                res.redirect('/404');
                return;
            }
            //attack the guruRecord with the request before calling next
            req.guruRecord = guruRecord;
            //all good.
            next();
        });
    },
    getGuruProfile: function(req, res) {
        res.render('public_profile', req.guruRecord);

    }
};
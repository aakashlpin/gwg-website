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
    getUserIndex: function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/u/reservations');

        } else {
            res.redirect('/door');
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
        var renderObject = req.guruRecord;
        if (req.user) {_.extend(renderObject, {user: req.user})}
        res.render('public_profile', renderObject);

    },
    getUserDoor: function(req, res) {
        //send the query params if found via url to the view
        //we can show different messages depending on it
        res.render('public_door', {params: req.query});
    },
    getEventsHandler: function(req, res) {
        var isUser = req.user ? req.user.is_user : false;
        res.render('public_events', {isUser: isUser});
    }
};
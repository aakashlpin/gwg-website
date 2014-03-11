var models = require('../models');

module.exports = {
    getUserHome: function(req, res) {
        //req.session.reserved contains the data of user actions before signing in/ logging in
        res.render('user/home', {user: req.user});
    }
};
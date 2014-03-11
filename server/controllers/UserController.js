var models = require('../models');

module.exports = {
    getUserHome: function(req, res) {
       res.render('user/home', {user: req.user});
    }
};
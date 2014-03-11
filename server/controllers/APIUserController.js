var models = require('../models');

module.exports = {
    postUserScheduleHandler: function(req, res) {
        if (!req.user) {
            //set the incoming variables in the session
            req.session.reservedSlots = req.body.reservedSlots;
            //send the redirect param
            res.json({redirect: '/door'});
        } else {
            //TODO handle the scenario for logged in user. Later.
        }
    }
};
var models = require('../models'),
    _ = require('underscore');

module.exports = {
    postUserScheduleHandler: function(req, res) {
        var data = _.pick(req.body.reserved, ['courseId', 'slots']);
        if (!data.courseId || !data.slots) {
            res.json({err: 'Invalid request'});
            return;
        }

        if (!req.user) {
            //set the incoming variables in the session
            req.session.reserved = data;
            //send the redirect param
            res.json({redirect: '/door?m=reservation'});

        } else {
            //store the damn thing and send back a success message
            var UserModel = models.User;
            UserModel.putReservations(req, function(err, update) {
                if (err) {
                    res.json({err: err});
                    return;
                }
                res.json({success: 'Successfully reserved!', paid: false})
            });
        }
    }
};
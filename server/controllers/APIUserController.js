var models = require('../models'),
    _ = require('underscore');

function saveReservationData (userId, reserved, cb) {
    var UserModel = models.User;
    UserModel.putReservations(userId, reserved, cb);
}

module.exports = {
    postUserScheduleHandler: function(req, res) {
        var data = _.pick(req.body.reserved, ['courseId', 'slots', 'url']);
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
            saveReservationData(req.user._id, req.body.reserved, function(err, updated) {
                if (err) {
                    res.json({err: err});
                    return;
                }
                res.json({success: 'Successfully reserved!', paid: false});
            })
        }
    },
    saveReservationData: saveReservationData
};
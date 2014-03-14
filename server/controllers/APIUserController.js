var models = require('../models'),
    _ = require('underscore');

function saveReservationData (studentId, reserved, cb) {
    var ReservationModel = models.Reservation,
        CourseModel = models.Course;

    //assign the userId as the studentId
    reserved.studentId = studentId;

    //get the guruId for the incoming courseId
    CourseModel.getById(reserved.courseId, '_creator', function(err, creatorObject) {
        //assign the guruId to the reservation object
        if (err) {
            console.log(err);
            cb(err);
            return;
        }

        reserved.guruId = creatorObject._creator;
        if (reserved.guruId.toHexString() === studentId.toHexString()) {
            //wtf! booking your own course?
            cb('Oops! You cannot book your own slots, right?');
            return;
        }
        ReservationModel.putReservations(reserved, function(err, reservationObject) {
            if (err) {
                console.log(err);
                cb(err);
                return;
            }

            cb(err, reservationObject);
        });
    });
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
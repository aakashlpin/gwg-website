var models = require('../models'),
    async = require('async'),
    _ = require('underscore');

function saveReservationData (user, reserved, cb) {
    var ReservationModel = models.Reservation,
        CourseModel = models.Course,
        GuruModel = models.Guru,
        studentEmail = user.email;

    //assign the userId as the studentId
    reserved.studentId = user._id;

    //get the guruId for the incoming courseId
    CourseModel.getById(reserved.courseId, '_creator', function(err, creatorObject) {
        //assign the guruId to the reservation object
        if (err) {
            console.log(err);
            cb(err);
            return;
        }

        reserved.guruId = creatorObject._creator;

        GuruModel.getById(creatorObject._creator, 'email', function(err, guruObject) {
            if (guruObject.email === studentEmail) {
                //wtf! booking your own course?
                cb('Oops! You cannot book your own course, right?');
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
            saveReservationData(req.user, req.body.reserved, function(err, updated) {
                if (err) {
                    res.json({err: err});
                    return;
                }
                res.json({success: 'Successfully reserved!', paid: false});
            })
        }
    },
    saveReservationData: saveReservationData,
    getUserReservationsHandler: function(req, res) {
        var ReservationModel    = models.Reservation,
            CourseModel         = models.Course,
            GuruModel           = models.Guru;

        ReservationModel.getByStudent(req.user._id, function(err, allReservations) {
            //foreach reservation, split the slots array to get individual time slots
            var reservations    = [],
                courses         = [],
                courseIds       = [],
                gurus           = [],
                guruIds         = [];

            allReservations.forEach(function(reservationItem) {
                var extendWith = _.pick(reservationItem, ['studentId', 'guruId', 'courseId']);
                extendWith.studentId    = extendWith.studentId.toHexString();
                extendWith.guruId       = extendWith.guruId.toHexString();
                extendWith.courseId     = extendWith.courseId.toHexString();

                courseIds.push(extendWith.courseId);
                guruIds.push(extendWith.guruId);

                reservationItem.slots.forEach(function(slotItem) {
                    reservations.push(_.extend(slotItem, extendWith));
                });
            });

            courseIds   = _.unique(courseIds);
            guruIds     = _.unique(guruIds);

            async.parallel([
                function(parallelCb) {
                    //ensure courseObject for this courseId has been fetched
                    async.each(courseIds, function(courseId, courseCb) {
                        CourseModel.getById(courseId, function(err, courseObject) {
                            courses.push(courseObject);
                            courseCb();
                        });
                    }, function() {
                        parallelCb();
                    });

                },
                function(parallelCb) {
                    //ensure userObject for this guruId has been fetched
                    async.each(guruIds, function(guruId, guruCb) {
                        GuruModel.getById(guruId, function(err, guruObject) {
                            gurus.push(guruObject);
                            guruCb();
                        });

                    }, function() {
                        parallelCb();
                    });

                }
            ], function(parallelErr) {
                if (parallelErr) {
                    res.json({
                        err: parallelErr
                    });
                    return;
                }

                res.json({
                    reservations: reservations,
                    courses: courses,
                    gurus: gurus
                })

            });

        })
    }
};
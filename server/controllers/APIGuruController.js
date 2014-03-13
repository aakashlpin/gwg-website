var models = require('../models'),
    async = require('async'),
    _ = require('underscore');

module.exports = {
    getUserHandler: function(req, res) {
        var data = _.pick(req.user, ['email', 'alternate_email', 'name']);
        res.json(data);

    },
    postGuruCourseHandler: function(req, res){
        var CourseModel = models.Course;
        CourseModel.post(req, function(err, data) {
            res.json(data);
        });

    },
    putGuruCourseHandler: function(req, res){
        var CourseModel = models.Course;
        CourseModel.put(req, function(err, data) {
            res.json(data);
        });

    },
    deleteGuruCourseHandler: function(req, res){
        var CourseModel = models.Course;
        CourseModel.del(req, function(err, data) {
            res.json(data);
        });

    },
    getGuruCourseHandler: function(req, res) {
        var CourseModel = models.Course;
        CourseModel.getByCreator(req, function(err, data) {
            res.json(data);
        });

    },
    postGuruBankHandler: function(req, res) {
        var BankModel = models.Bank;
        BankModel.post(req, function(err, data) {
            res.json(data);
        });

    },
    getGuruBankHandler: function(req, res) {
        var BankModel = models.Bank;
        BankModel.getByCreator(req, function(err, data) {
            res.json(data);
        });

    },
    postGuruScheduleHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.put(req, ['schedule'], function(err, data) {
            res.json(data);
        });

    },
    getGuruScheduleHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.get(req, ['schedule'], function(err, data) {
            res.json(data);
        })

    },
    postGuruProfileHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.put(req, ['extras'], function(err, data) {
            res.json(data);
        });

    },
    getGuruProfileHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.get(req, ['extras', 'username'], function(err, data) {
            res.json(data);
        });

    },
    postGuruSoundCloudHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.put(req, ['soundcloud'], function(err, data) {
            res.json(data);
        });

    },
    getGuruSoundCloudHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.get(req, ['soundcloud'], function(err, data) {
            res.json(data);
        });

    },
    postGuruYoutubeHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.put(req, ['youtube'], function(err, data) {
            res.json(data);
        });

    },
    getGuruYoutubeHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.get(req, ['youtube'], function(err, data) {
            res.json(data);
        });

    },
    postGuruAccountHandler: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.associateAccount(req, function(err, data) {
            res.json(data);
        });

    },
    getGuruReservationsHandler: function(req, res) {
        var ReservationModel    = models.Reservation,
            CourseModel         = models.Course,
            StudentModel        = models.User;

        ReservationModel.getByGuru(req.user._id, function(err, allReservations) {
            //foreach reservation, split the slots array to get individual time slots
            var reservations    = [],
                courses         = [],
                courseIds       = [],
                students        = [],
                studentIds      = [];

            allReservations.forEach(function(reservationItem) {
                var extendWith = _.pick(reservationItem, ['studentId', 'guruId', 'courseId']);
                extendWith.studentId    = extendWith.studentId.toHexString();
                extendWith.guruId       = extendWith.guruId.toHexString();
                extendWith.courseId     = extendWith.courseId.toHexString();

                courseIds.push(extendWith.courseId);
                studentIds.push(extendWith.studentId);

                reservationItem.slots.forEach(function(slotItem) {
                    reservations.push(_.extend(slotItem, extendWith));
                });
            });

            courseIds   = _.unique(courseIds);
            studentIds  = _.unique(studentIds);

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
                    //ensure userObject for this studentId has been fetched
                    async.each(studentIds, function(studentId, studentCb) {
                        StudentModel.getById(studentId, function(err, studentObject) {
                            students.push(studentObject);
                            studentCb();
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
                    students: students
                })

            });

        })
    }
};
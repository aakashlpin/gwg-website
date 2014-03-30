var config = require('config'),
    async = require('async'),
    models = require('../models'),
    EmailController = require('./EmailController'),
    nodemailer     = require('nodemailer'),
    _ = require('underscore');

module.exports = {
    getSignupsHandler: function(req, res) {
        async.parallel({
            userSignups: function(callback) {
                var SignupModel = models.Signup;
                SignupModel.getAll(req, callback);
            },
            guruSignups: function(callback) {
                var GuruModel = models.Guru;
                GuruModel.getAll(req, callback);
            },
            eventRegistrations: function(callback) {
                var UserModel = models.User;
                UserModel.getAll(req, callback);
            }
        }, function(err, results) {
            //map each guru with his courses
            async.map(results.guruSignups,
                function(guru, callback) {
                    var CourseModel = models.Course;
                    CourseModel.getByCreator(guru._id, function(err, coursesByGuru) {
                        guru.courses = coursesByGuru;
                        callback(err, guru);
                    });
                },
                function(err, guruArrayWithCourses) {
                    res.render('admin/signups', {
                        users: results.userSignups,
                        gurus: guruArrayWithCourses,
                        eventRegistrations: results.eventRegistrations
                    });
                });
        });

    },
    notifyAllUsersAboutEvent: function(req, res) {
        var UserModel = models.User;
        UserModel.getAll(req, function(err, users) {
            var transport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "aakash@guitarwith.guru",
                    pass: "t1mguitarwithgurupasswd"
                }
            });

            users.forEach(function(user) {
                var emailObject = {
                    user: user,
                    subject: 'Going Live at 4. Google Hangout request coming your way!'
                };

                EmailController.emailNotifyingAboutEvent(emailObject, transport, function(err, emailStatus) {
                    console.log(err, emailStatus);
                });
            });
        });


        res.json({status: 'in progress'});
    },
    migrateScheduleToNewSchema: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.migrateScheduleToNewSchema(function(err, done) {
            if (err) {
                res.json({error: err});
                return;
            }
            res.json({status: 'ok'});
        });
    }
};
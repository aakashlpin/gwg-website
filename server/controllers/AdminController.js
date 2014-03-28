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
        var SignupModel = models.Signup;
        SignupModel.getAll(req, function(err, signups) {
            var transport = nodemailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "aakash@guitarwith.guru",
                    pass: "t1mguitarwithgurupasswd"
                }
            });

            var emails = [];
            var toReject = [
                'amogh.vaishampayan@gmail.com',
                'monj021@gmail.com',
                'chakri.gudboy@gmail.com',
                'sam_dhar@hotmail.com',
                'akshat13.modi@gmail.com',
                'fdsfsd@xdfvxd.com',
                'abc@abc.in',
                'ghgfhgfhfghgfhfghgfh@gmail.com',
                'aakash.lpin@gmail.com',
                'mukeshanku@gmail.com',
                'ekta.2804@gmail.com',
                'sami@samridhishree.com',
                'sdwivedi88@yahoo.com',
                'tushar.jain9@yahoo.com',
                'aram.bhusal@gmail.com',
                'akki.angel@gmail.com',
                'ashfaqdawood@yahoo.com',
                'k.shikhar@yahoo.com',
                'vin070@gmail.com',
                'vivekpatna52@gmail.com',
                'krushi.lr@gmail.com',
                'jatinkhandelwal@rocketmail.com'
            ];

            signups.forEach(function(signup) {
                emails.push(signup.email);

            });

            emails = _.difference(emails, toReject);

            emails.forEach(function(email) {
                var emailObject = {
                    user: email,
                    subject: 'Free Live Guitar Session on Country style finger picking this Sunday!'
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
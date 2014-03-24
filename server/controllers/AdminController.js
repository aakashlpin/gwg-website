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
                    res.render('admin/signups', {users: results.userSignups, gurus: guruArrayWithCourses});
                });
        });

    },
    welcomeAllGurusEmailHandler: function(req, res) {
        /* served as a one time use case to welcome all gurus on board
        * not in use right now */
        var GuruModel = models.Guru;

        GuruModel.getAll(req, function(err, gurus) {
            gurus.forEach(function(guru) {
                var emailObject = {
                    user: _.pick(guru, ['name', 'email']),
                    subject: "Welcome! Let's get you on boarded as a Guru"
                };

                EmailController.emailWelcomingGuru(emailObject, function(err, emailStatus) {
                    console.log(err, emailStatus);
                });
            });
        });

        res.json({status: 'in progress'});
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
    }
};
var config = require('config'),
    async = require('async'),
    models = require('../models'),
    EmailController = require('./EmailController');

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
    }
};
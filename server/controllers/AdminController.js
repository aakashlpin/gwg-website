var config = require('config'),
    async = require('async'),
    models = require('../models');

module.exports = {
    getSignupsHandler: function(req, res) {
        if (config.admin.emails.indexOf(req.user.email) < 0) {
            res.redirect('/g');
            return;
        }

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

    }
};
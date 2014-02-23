var config = require('config'),
    async = require('async'),
    models = require('../models');

module.exports = {
    getUserHandler: function(req, res) {
        res.json(req.user);
    },
    postSignupHandler: function(req, res) {
        var SignupModel = models.Signup;
        SignupModel.post(req, function(err, data) {
            res.json(data);
        });

    },
    postGuruCourseHandler: function(req, res){
        var CourseModel = models.Course;
        CourseModel.post(req, function(err, data) {
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
        GuruModel.get(req, ['extras'], function(err, data) {
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

    }


};
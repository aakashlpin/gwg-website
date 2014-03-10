var models = require('../models');

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

    }
};
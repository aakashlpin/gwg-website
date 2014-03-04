var config = require('config'),
    async = require('async'),
    models = require('../models'),
    moment = require('moment'),
    _ = require('underscore');

module.exports = {
    getUserHandler: function(req, res) {
        var data = _.pick(req.user, ['email', 'alternate_email', 'name', 'picture']);
        res.json(data);
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
    getPublicSoundCloudHandler: function(req, res) {
        var GuruModel = models.Guru;
        var username = req.query.username;
        if (!username || (username && !username.trim().length)) {
            res.json({err: 'invalid request'});
            return;
        }

        GuruModel.getByUserName(username, function(err, guruRecord) {
            if (!err && guruRecord) {
                res.json(guruRecord.soundcloud);
            }
        })
    },
    getPublicYouTubeHandler: function(req, res) {
        var GuruModel = models.Guru;
        var username = req.query.username;
        if (!username || (username && !username.trim().length)) {
            res.json({err: 'invalid request'});
            return;
        }

        GuruModel.getByUserName(username, function(err, guruRecord) {
            if (!err && guruRecord) {
                res.json(guruRecord.youtube);
            }
        })
    },
    getPublicScheduleHandler: function(req, res) {
        var GuruModel = models.Guru;
        var username = req.query.username;
        if (!username || (username && !username.trim().length)) {
            res.json({err: 'invalid request'});
            return;
        }

        GuruModel.getByUserName(username, function(err, guruRecord) {
            if (!err && guruRecord) {
                var schedule = guruRecord.schedule;
                //right now, lets send out events for next 30 days
                //later we will have to see what how often are gurus able to update their schedule

                //starting tomorrow, send out the events (will increment in the loop)
                var tomorrow = moment();
                var NO_OF_DAYS = 30;
                var events = [];
                while (NO_OF_DAYS--) {
                    tomorrow = moment(tomorrow).add('days', 1);
                    //closure with loops 101
                    (function(tomorrow){
                        var scheduleForDay = _.find(schedule, function(scheduleItem) {
                            return scheduleItem.day_code.toLowerCase() === moment(tomorrow).format('ddd').toLowerCase();
                        });

                        //if no slots, go back
                        if (!scheduleForDay.noSlots) {
                            //this date has slots
                            if (scheduleForDay.currentMode !== 'manual') {
                                //find out the day that is to be copied from
                                var copyFromDayCode = scheduleForDay.selectedDayCode;
                                //get fresh schedule for day
                                scheduleForDay = _.find(schedule, function(scheduleItem) {
                                    return scheduleItem.day_code.toLowerCase() === copyFromDayCode.toLowerCase();
                                });
                            }

                            //loop through slots property and fill in the events array.
                            var slots = scheduleForDay.slots;
                            _.each(slots, function(slot) {
                                var momentString = tomorrow.format('MMMM D YYYY');

                                var momentStartString = momentString + ", " + formatTime(slot.startTime);
                                var momentEndString = momentString + ", " + formatTime(slot.endTime);
                                var exactStartTimeInMoment = moment(momentStartString, 'MMMM D YYYY, hh:mm A')
                                    .unix();
                                var exactEndTimeInMoment = moment(momentEndString, 'MMMM D YYYY, hh:mm A')
                                    .unix();

                                events.push({
                                    start: exactStartTimeInMoment,
                                    end: exactEndTimeInMoment,
                                    allDay: false,
                                    title: 'Available'
                                });

                            });

                        }
                    })(tomorrow);
                }

                res.json(events);
            }
        })
    }


};

function formatTime(time) {
    //if input time is of format h:mm A
    //return back hh:mm A
    return time.split(' ')[0].split(':')[0].length < 2 ? '0' + time : time;
}
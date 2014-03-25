var config = require('config'),
    async = require('async'),
    models = require('../models'),
    moment = require('moment'),
    _ = require('underscore');

module.exports = {
    postSignupHandler: function(req, res) {
        var SignupModel = models.Signup;
        SignupModel.post(req, function(err, data) {
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
        var GuruModel = models.Guru,
            ReservationModel = models.Reservation;

        var formatString = 'MMMM D YYYY, hh:mm A';
        var relevantData = _.pick(req.query, ['username', 'start', 'end']);

        var username = relevantData.username,
            startMoment = relevantData.start ? moment(relevantData.start, 'X') : moment(),
            endMoment = relevantData.end ? moment(relevantData.end, 'X') : moment().add('days', 30);

        if (!username || (username && !username.trim().length)) {
            res.json({err: 'invalid request. username missing'});
            return;
        }

        GuruModel.getByUserName(username, function getGuruByUserName(err, guruRecord) {
            if (err || !guruRecord) {
                res.json({err: err ? err: 'No record for ' + username + ' found.'});
                return;
            }

            var schedule = guruRecord.schedule;
            var scheduleMap = {};
            _.each(schedule, function(scheduleItem) {
                scheduleMap[scheduleItem.day_code.toLowerCase()] = scheduleItem;
            });

            ReservationModel.getByGuru(guruRecord._id, function getReservations(err, reservationsForGuru) {
                if (err) {
                    console.log('Error in getting reservations', err);
                    reservationsForGuru = [];
                }

                var reservedSlots = [];
                reservationsForGuru.forEach(function(reservationForGuru) {
                    reservationForGuru.slots.forEach(function(slot) {
                        if (!slot.completed && !slot.cancelled) {
                            var formattedSlotStart = moment(slot.start).format(formatString);
                            reservedSlots.push(formattedSlotStart);
                        }
                    });
                });

                //from what is requested,
                var tomorrow = startMoment.isAfter(moment()) ? startMoment: moment();
                var NO_OF_DAYS = endMoment.diff(tomorrow, 'days') + 1;
                var events = [];
                while (NO_OF_DAYS--) {
                    //closure with loops 101
                    (function createEventsIIFE(tomorrow){
                        var scheduleForDay = scheduleMap[moment(tomorrow).format('ddd').toLowerCase()];

                        //if no slots, go back
                        if (!scheduleForDay.noSlots) {
                            //this date has slots
                            if (scheduleForDay.currentMode !== 'manual') {
                                //find out the day that is to be copied from
                                var copyFromDayCode = scheduleForDay.selectedDayCode;
                                //get fresh schedule for day
                                scheduleForDay = scheduleMap[copyFromDayCode.toLowerCase()];
                            }

                            //loop through slots property and fill in the events array.
                            var slots = scheduleForDay.slots;
                            _.each(slots, function(slot) {
                                var momentString = moment(tomorrow).format('MMMM D YYYY');
                                var momentStartString = momentString + ", " + formatTime(slot.startTime);
                                var momentEndString = momentString + ", " + formatTime(slot.endTime);
                                var startTimeInMoment = moment(momentStartString, formatString);
                                var endTimeInMoment = moment(momentEndString, formatString);
                                var exactStartTimeInMoment = startTimeInMoment.unix();
                                var exactEndTimeInMoment = endTimeInMoment.unix();

                                var eventObject;
                                if (reservedSlots.indexOf(momentStartString) < 0) {
                                    eventObject = {
                                        id: exactStartTimeInMoment,
                                        start: exactStartTimeInMoment,
                                        end: exactEndTimeInMoment,
                                        allDay: false,
                                        title: 'Available',
                                        color: '#3a87ad'
                                    };

                                } else {
                                    eventObject = {
                                        id: exactStartTimeInMoment,
                                        start: exactStartTimeInMoment,
                                        end: exactEndTimeInMoment,
                                        allDay: false,
                                        title: 'Reserved',
                                        color: '#eee'
                                    };

                                }

                                events.push(eventObject);

                            });

                        }
                    })(tomorrow);
                    tomorrow = moment(tomorrow).add('days', 1);
                }

                res.json(events);

            });
        })
    },
    getPublicCoursesHandler: function(req, res) {
        var GuruModel = models.Guru;
        var username = req.query.username;
        if (!username || (username && !username.trim().length)) {
            res.json({err: 'invalid request'});
            return;
        }

        GuruModel.getByUserName(username, function(err, guruRecord) {
            if (err || !guruRecord) {
                res.json({err: err ? err: 'User is a ghost. No record for user found.'});
                return;
            }

            var creatorId = guruRecord._id;
            var CourseModel = models.Course;

            CourseModel.getByCreator(creatorId, function(err, courseRecord) {
                if (err || !courseRecord || (courseRecord && !courseRecord.length)) {
                    res.json({err: err ? err : 'No Courses found'});
                    return;
                }

                res.json(courseRecord);
            })
        })
    }

};

function formatTime(time) {
    //if input time is of format h:mm A
    //return back hh:mm A
    return time.split(' ')[0].split(':')[0].length < 2 ? '0' + time : time;
}
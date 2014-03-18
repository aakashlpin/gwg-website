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
        var username = req.query.username;
        if (!username || (username && !username.trim().length)) {
            res.json({err: 'invalid request'});
            return;
        }

        GuruModel.getByUserName(username, function getGuruByUserName(err, guruRecord) {
            if (err || !guruRecord) {
                res.json({err: err ? err: 'User is a ghost. No record for user found.'});

            } else {
                var schedule = guruRecord.schedule;
                //right now, let's send out events for next 30 days
                //later we will have to see what how often are gurus able to update their schedule

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

                    function momentWithZone() {
                        var timezoneOffset = - (guruRecord.timezone ? guruRecord.timezone : 5.5);
                        return moment.apply(this, arguments).utc();
                    }

                    //starting tomorrow, send out the events (will increment in the loop)
                    var tomorrow = momentWithZone();
                    console.log('initial tomorrow', tomorrow.format());
                    var NO_OF_DAYS = 30;
                    var events = [];
                    while (NO_OF_DAYS--) {
                        tomorrow = momentWithZone(tomorrow).add('days', 1);
                        //closure with loops 101
                        (function createEventsIIFE(tomorrow){
                            var scheduleForDay = scheduleMap[momentWithZone(tomorrow).format('ddd').toLowerCase()];

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
                                    var momentString = momentWithZone(tomorrow).format('MMMM D YYYY');
                                    console.log(momentString);
                                    var momentStartString = momentString + ", " + formatTime(slot.startTime);
                                    var momentEndString = momentString + ", " + formatTime(slot.endTime);
                                    var startTimeInMoment = momentWithZone(momentStartString, formatString);
                                    var endTimeInMoment = momentWithZone(momentEndString, formatString);
                                    console.log(startTimeInMoment.format());
                                    var exactStartTimeInMoment = startTimeInMoment.unix();
                                    var exactEndTimeInMoment = endTimeInMoment.unix();

                                    var eventObject;
                                    if (reservedSlots.indexOf(momentStartString) < 0) {
                                        eventObject = {
                                            start: exactStartTimeInMoment,
                                            end: exactEndTimeInMoment,
                                            allDay: false,
                                            title: 'Available',
                                            color: '#3a87ad'
                                        };

                                    } else {
                                        eventObject = {
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
                    }

                    res.json(events);

                });
            }
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
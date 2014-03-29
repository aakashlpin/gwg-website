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
        var compareFormatString = 'MMMM D YYYY';
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

            var schedule = guruRecord.schedule,
                calendar_schedule = guruRecord.calendar_schedule,
                finalDate = guruRecord.final_date ? moment(guruRecord.final_date) : null,
                scheduleMap = {},
                calendarScheduleMap = {};

            //index by day code
            _.each(schedule, function(scheduleItem) {
                scheduleMap[scheduleItem.day_code.toLowerCase()] = scheduleItem;
            });

            //index by date format compareFormatString
            _.each(calendar_schedule, function(calendarScheduleItem) {
                var key = moment(calendarScheduleItem.date).format(compareFormatString);
                calendarScheduleMap[key] = calendarScheduleItem;
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
                        if (finalDate && tomorrow.isAfter(finalDate)) return;
                        var scheduleForDay = scheduleMap[moment(tomorrow).format('ddd').toLowerCase()];

                        if (scheduleForDay.currentMode !== 'manual') {
                            //find out the day that is to be copied from
                            var copyFromDayCode = scheduleForDay.selectedDayCode;
                            //get fresh schedule for day
                            scheduleForDay = scheduleMap[copyFromDayCode.toLowerCase()];
                        }

                        //loop through slots property and fill in the events array.
                        var slots = scheduleForDay.slots,
                            momentString = moment(tomorrow).format(compareFormatString),
                            calendarScheduleForDate = calendarScheduleMap[momentString],
                            slotsToRemove = null,
                            slotsToAdd = null,
                            dynamicSlots;

                        if (calendarScheduleForDate) {
                            //special calendar events exist for this date
                            //if removed_slots exist, remove from events array
                            //if added_slots exist, add them to the events array
                            slotsToRemove = calendarScheduleForDate.removed_slots;
                            slotsToAdd = calendarScheduleForDate.added_slots;

                            dynamicSlots = _.flatten(_.union(slotsToRemove, slotsToAdd));
                        }

                        function processSlot(slot, shouldSlotBeSkippedCheck) {
                            var formattedStartTime = formatTime(slot.startTime),
                                formattedEndTime = formatTime(slot.endTime);

                            if (shouldSlotBeSkippedCheck) {
                                if (shouldSlotBeSkipped(dynamicSlots, formattedStartTime)) {
                                    return;
                                }
                            }

                            var momentStartString   = momentString + ", " + formattedStartTime,
                                momentEndString     = momentString + ", " + formattedEndTime,
                                startTimeInMoment   = moment(momentStartString, formatString),
                                endTimeInMoment     = moment(momentEndString, formatString),
                                startTimeUnix       = startTimeInMoment.unix(),
                                endTimeUnix         = endTimeInMoment.unix(),
                                eventObject;

                            if (reservedSlots.indexOf(momentStartString) < 0) {
                                eventObject = {
                                    id: startTimeUnix,
                                    start: startTimeUnix,
                                    end: endTimeUnix,
                                    allDay: false,
                                    title: 'Available',
                                    color: '#3a87ad'
                                };

                            } else {
                                eventObject = {
                                    id: startTimeUnix,
                                    start: startTimeUnix,
                                    end: endTimeUnix,
                                    allDay: false,
                                    title: 'Reserved',
                                    color: '#eee'
                                };

                            }

                            events.push(eventObject);
                        }

                        _.each(slots, function(slot) {
                            processSlot(slot, true);
                        });

                        _.each(slotsToAdd, function(slotToAdd) {
                            processSlot(slotToAdd, false);
                        });

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

function shouldSlotBeSkipped(removedSlots, startTime) {
    return _.find(removedSlots, function(removedSlot) {
        return removedSlot.startTime === startTime;
    }, this);
}
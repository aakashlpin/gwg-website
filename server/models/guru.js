var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require ('config'),
    Course = require('./course'),
    async  = require('async'),
    moment = require('moment');

_ = require('underscore');

var Guru, GuruSchema, AddedSlotSchema, CalendarScheduleSchema, ScheduleSlotSchema, initialSchedule;

AddedSlotSchema = new Schema({
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    title: String   //useful when creating custom events
}, {_id: false});

RemovedSlotSchema = new Schema({
    startTime: {type: String, required: true}
}, {_id: false});

CalendarScheduleSchema = new Schema({
    date: Date,
    added_slots: [AddedSlotSchema],
    removed_slots: [RemovedSlotSchema]
}, {_id: false});

ScheduleSlotSchema = new Schema({
    startTime: {type: String, required: true},
    endTime: {type: String, required: true}
}, {_id: false});

initialSchedule = [ {
    day_code: 'mon',
    day_name: 'Monday',
    slots: [{
        startTime: '08:00 AM',
        endTime: '09:00 AM'
    }, {
        startTime: '09:00 AM',
        endTime: '10:00 AM'
    }],
    currentMode: 'manual'
}, {
    day_code: 'tue',
    day_name: 'Tuesday',
    currentMode: 'copy',
    selectedDayCode: 'mon'
}, {
    day_code: 'wed',
    day_name: 'Wednesday',
    slots: [{
        startTime: '10:00 PM',
        endTime: '11:00 PM'
    }],
    currentMode: 'manual'
}, {
    day_code: 'thu',
    day_name: 'Thursday',
    currentMode: 'copy',
    selectedDayCode: 'wed'
}, {
    day_code: 'fri',
    day_name: 'Friday',
    currentMode: 'copy',
    selectedDayCode: 'wed'
}, {
    day_code: 'sat',
    day_name: 'Saturday',
    currentMode: 'copy',
    selectedDayCode: 'mon'
}, {
    day_code: 'sun',
    day_name: 'Sunday',
    slots: [],
    currentMode: 'manual'
} ];

GuruSchema = new Schema({
    id: String,
    username: String,
    email: String,
    alternate_email: String,
    gender: String,
    link: String,
    location: { id: {type: String}, name: {type: String} },
    name: String,
    timezone: Number,
    is_guru: { type: Boolean, default: true },  //updated: field to allow/ reject person as a guru
    picture: String,
    final_date: Date,   //until when is the guru sure about his schedule
    schedule: [{
        day_code: { type: String, required: true },
        day_name: { type: String, required: true },
        currentMode: { type: String, required: true },
        slots: [ ScheduleSlotSchema ],  //will be required only when currentMode is set to 'manual'
        selectedDayCode: { type: String }   //will be required only when currentMode is set to 'copy'
    }],
    calendar_schedule: [CalendarScheduleSchema],
    extras: {
        band_name: String,
        about_me: [{type: String}],
        links: [{type: String}],
        phone: String
    },
    soundcloud: {
        connected: {type: Boolean, default: false}, //has soundcloud been connected?
        permalink_url: {type: String},  //link to pass on to embed widget
        is_shown: {type: Boolean, default: false}    //is widget enabled in profile?
    },
    youtube: [{
        title: String,
        description: String,
        videoId: String,
        enabled: Boolean
    }],
    facebook: {
        access_token: {type: String}
    },
    google: {
        access_token: {type: String}
    }
});

GuruSchema.statics.put = function(req, fields, callback) {
    var id, update, data, options, Guru;
    id = req.user._id;

    if (!id) return callback('Cannot update without user id');

    update = {_id: id};
    data = _.pick(req.body, fields);
    options = {};

    this.update(update, data, options, callback);

};

GuruSchema.statics.updateCalendarSchedule = function(req, callback) {
    var id, query, updatedCalendarSchedule;
    id = req.user._id;

    if (!id) return callback('Cannot update without user id');

    query = {_id: id};
    updatedCalendarSchedule = req.body.calendar_schedule;

    var _this = this;
    this.findOne(query).exec(function(err, record) {
        var existingSchedule = record.calendar_schedule;

        async.each(updatedCalendarSchedule, function(updatedCalendarScheduleItem, asyncCb) {
            var existingScheduleItem = _.find(existingSchedule, function(existingScheduleItem) {
                return moment(updatedCalendarScheduleItem.date).isSame(moment(existingScheduleItem.date))
            });

            if (!existingScheduleItem) {
                record.update({$push: {calendar_schedule: updatedCalendarScheduleItem}}, {}, function(err, update) {
                    if (err) {
                        console.log(err);
                    }
                    asyncCb(err);
                });
                return;
            }

            function removeSlotsWithSameStartTime(existingSlot) {
                return (
                    !!_.find(updatedCalendarScheduleItem.removed_slots, function(updatedRemovedSlot) {
                        return updatedRemovedSlot.startTime === existingSlot.startTime;
                    })
                    ||
                    !!_.find(updatedCalendarScheduleItem.added_slots, function(updatedAddedSlot) {
                        return updatedAddedSlot.startTime === existingSlot.startTime;
                    })
                    )
            }

            existingScheduleItem.removed_slots = _.reject(existingScheduleItem.removed_slots, removeSlotsWithSameStartTime);
            existingScheduleItem.added_slots = _.reject(existingScheduleItem.added_slots, removeSlotsWithSameStartTime);

            existingScheduleItem.removed_slots = _.union(existingScheduleItem.removed_slots || [], updatedCalendarScheduleItem.removed_slots || []);
            existingScheduleItem.added_slots = _.union(existingScheduleItem.added_slots || [], updatedCalendarScheduleItem.added_slots || []);

            _this.update(
                {_id: id, 'calendar_schedule.date': updatedCalendarScheduleItem.date}, {'$set': {
                    'calendar_schedule.$.removed_slots': existingScheduleItem.removed_slots,
                    'calendar_schedule.$.added_slots': existingScheduleItem.added_slots
                }},
                {},
                function(err, updated) {
                    if (err) {
                        console.log(err);
                    }
                    asyncCb(err);
                });

        }, function(err) {
            if (err) {
                console.log(err);
            }
            callback(err, 1);

        });

    });

};

GuruSchema.statics.get = function(req, fields, callback) {
    var fieldObject = {};
    _.each(fields, function(field) {
        fieldObject[field] = 1;
    });

    this.findOne({_id: req.user._id}, fieldObject, callback);
};

GuruSchema.statics.getById = function(guruId, fields, callback) {
    if (typeof fields === 'function') {
        callback = fields;
        fields = [];
    }

    if (!_.isArray(fields)) {
        //if just one field passed in instead of an array
        fields = [fields];
    }

    if (!guruId) {
        return callback('Cannot get without guru id');
    }

    var fetchObject = {};
    _.each(fields, function(field) {
        fetchObject[field] = 1;
    });

    this.findById(guruId, fetchObject).lean().exec(callback);
};


GuruSchema.statics.findOrCreate = function(accessToken, refreshToken, profile, callback) {
    var dataOfInterest = _.pick(profile._json,
        ['id', 'name', 'gender', 'link', 'email', 'location', 'timezone', 'username', 'picture']
    );

    var self = this,
        email = dataOfInterest.email,
        emailQuery = {$or: [{email: email}, {alternate_email: email}]};

    this.findOne(emailQuery, function(err, user) {
        if (err) {
            return callback(err, null);
        }

        if (user) {
            //depending on the provider, update the access_token and refresh_token fields
            var updateOnLoginData = {}, updateOnLoginOptions = {};
            updateOnLoginData[profile.provider] = {};
            updateOnLoginData[profile.provider].access_token = accessToken;

            if (profile.provider === 'facebook') {
                updateOnLoginData.picture = '//graph.facebook.com/'+ dataOfInterest.username +'/picture';

            } else if (profile.provider === 'google') {
                updateOnLoginData.picture = dataOfInterest.picture;
            }

            self.findOneAndUpdate(emailQuery, updateOnLoginData, updateOnLoginOptions, function(err, updatedUser) {
                if (err) {
                    console.error(err);
                    callback(err);
                    return;
                }
                updatedUser.exists = true;    //send a note to client to not start the on-boarding experience
                callback(null, updatedUser);
            });

            return;
        }

        //create a picture field for new facebook signUp
        //google provider will send it by as part of API response
        if (profile.provider === 'facebook') {
            dataOfInterest.picture = '//graph.facebook.com/'+ dataOfInterest.username +'/picture';
        }

        dataOfInterest.schedule = initialSchedule;

        getNewUserName(dataOfInterest, function(username) {
            //if the dataOfInterest already has a username (when coming via facebook)
            //then we simply return back the same username
            dataOfInterest.username = username;
            var data = new self(dataOfInterest);
            data.save(callback);
        });
    });
};

GuruSchema.statics.getAll = function(req, callback) {
    if (config.admin.emails.indexOf(req.user.email) < 0) {
        return callback('Unauthorized');
    }

    this.find().lean().exec(callback);
};

GuruSchema.statics.associateAccount = function(req, callback) {
    var sessionUser = req.user,
        sessionUserEmail = sessionUser.email,
        findQuery = {$or: [{email: sessionUserEmail}, {alternate_email: sessionUserEmail}]};

    var data = _.pick(req.body, ['email', 'google']);

    this.findOne(findQuery, {email: 1, alternate_email: 1}, function(err, doc) {
        if (err || !doc) {
            console.err(err);
            return;
        }

        var updateParams = {}, updateOptions = {};
        if (doc.email === data.email || doc.alternate_email === data.email) {
            //no update of email is necessary
            //update the refresh token
            updateParams.google = data.google;

        } else {
            updateParams.alternate_email = data.email;
        }

        this.update(findQuery, updateParams, updateOptions, callback);
    }.bind(this))
};

GuruSchema.statics.getByUserName = function(username, callback) {
    this.findOne({username: username}, {}, callback);

};

GuruSchema.statics.getByObject = function(findQuery, getFields, callback) {
    if (typeof getFields === 'function') {
        callback = getFields;
        getFields = {};
    }

    this.findOne(findQuery, getFields, callback);
};

GuruSchema.statics.migrationAssignUserName = function(callback) {
    this.find({}, function(err, gurus) {
        async.each(gurus, function(guru, eachCb) {
            if (!guru.username) {
                getNewUserName(guru, function(username) {
                    this.update({_id: guru._id}, {username: username}, {}, function(err, updated) {
                        eachCb(err);
                    });

                }.bind(this));

            } else {
                eachCb();
            }

        }.bind(this), function(err) {
            callback(err);
        });
    }.bind(this));
};

GuruSchema.statics.migrateScheduleToNewSchema = function(callback) {
    this.find().exec(function(err, gurus) {
        async.each(gurus, function(guru, eachCb) {
            guru.update({$set: {schedule: initialSchedule}}, {}, function(err, updated) {
                eachCb(err)
            });
        }, function(err) {
            callback(err);
        });
    });

};

Guru = mongoose.model('Guru', GuruSchema);

function getNewUserName (guru, cb) {
    if (guru.username) {
        cb(guru.username);
        return;
    }

    var email = guru.email,
        name = guru.name;

    Guru.find({}, function(err, gurus) {
        var existingUserNames = [];
        gurus.forEach(function(guru) {
            if (guru.username) {
                existingUserNames.push(guru.username);
            }
        });

        var usernameChoices = [email.split('@')[0], name.toLowerCase().replace(/\s/g, '.')];
        var conflictingUserNames = _.intersection(usernameChoices, existingUserNames);
        if (conflictingUserNames.length === usernameChoices.length) {
            //generate another username
            var bigRandomNumber = Math.floor(Math.random()*100000);
            cb(usernameChoices[1] + '.' + bigRandomNumber);

        } else if (conflictingUserNames.length) {
            //if at-least one name was found common
            var availableUserNames = _.difference(usernameChoices, conflictingUserNames);
            cb(availableUserNames[0]);

        } else {
            cb(usernameChoices[0]);

        }
    });
}

module.exports = Guru;
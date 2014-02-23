var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    config = require ('config'),
    Course = require('./course');

_ = require('underscore');

var Guru, GuruSchema;

GuruSchema = new Schema({
    id: String,
    username: String,
    email: String,
    gender: String,
    link: String,
    location: String,
    name: String,
    timezone: Number,
    is_guru: { type: Boolean, default: true },  //updated: field to allow/ reject person as a guru
    schedule: [{
        day_code: String,
        day_name: String,
        slots: [{
            startTime: String,
            endTime: String
        }],
        noSlots: Boolean,
        currentMode: String,
        selectedDayCode: String
    }],
    extras: {
        band_name: String,
        about_me: [{type: String}],
        links: [{type: String}]
    },
    soundcloud: {
        connected: {type: Boolean, default: false}, //has soundcloud been connected?
        permalink_url: {type: String},  //link to pass on to embed widget
        is_shown: {type: Boolean, default: false}    //is widget enabled in profile?
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

GuruSchema.statics.get = function(req, fields, callback) {
    var fieldObject = {};
    _.each(fields, function(field) {
        fieldObject[field] = 1;
    });

    this.findOne({_id: req.user._id}, fieldObject, callback);
};

GuruSchema.statics.findOrCreate = function(profile, callback) {
    var dataOfInterest = _.pick(profile._json,
        ['id', 'name', 'gender', 'link', 'email', 'location', 'timezone', 'username']
    );

    var self = this;
    this.findOne({email: dataOfInterest.email}, function(err, user) {
        if (err) {
            return callback(err, null);
        }

        if (user) {
            user.exists = true;    //send a note to client to not start the on-boarding experience
            return callback(null, user);
        }

        dataOfInterest.schedule = [ {
            day_code: 'mon',
            day_name: 'Monday',
            slots: [{
                startTime: '08:00 AM',
                endTime: '09:00 AM'
            }],
            currentMode: 'manual',
            noSlots: false
        }, {
            day_code: 'tue',
            day_name: 'Tuesday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'wed',
            day_name: 'Wednesday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'thu',
            day_name: 'Thursday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'fri',
            day_name: 'Friday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'sat',
            day_name: 'Saturday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'sun',
            day_name: 'Sunday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        } ];

        var data = new self(dataOfInterest);
        data.save(callback);
    });
};

GuruSchema.statics.getAll = function(req, callback) {
    if (req.user.email !== config.admin.email) {
        return callback('Unauthorized');
    }

    this.find(callback);
};

Guru = mongoose.model('Guru', GuruSchema);

module.exports = Guru;
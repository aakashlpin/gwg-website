var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
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
    courses: [{
        type: ObjectId,
        ref: 'Course'
    }],
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
    }]
});


GuruSchema.statics.get = function(req, api, callback) {
    var id = req.param._id;
    if (id) {
        this.findById(id).exec(callback);
    } else {
        this
            .find()
            .where('del', false)
            .exec(callback);
    }

};

GuruSchema.statics.put = function(req, api, callback) {
    var id, update, data, options, Guru;
    id = req.param('id');

    if (!id) return callback('Cannot update without id');

    update = {_id: id};
    data = _.pick(req.body, ['title', 'body']);
    options = {};

    this.update(update, data, options, callback);

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

Guru = mongoose.model('Guru', GuruSchema);

module.exports = Guru;
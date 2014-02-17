var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId;

/* Schemas */
var Guru;

Guru = new Schema({
    id: String,
    username: String,
    email: String,
    gender: String,
    link: String,
    location: String,
    name: String,
    timezone: Number,
    courses: Array,
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

module.exports.GuruSchema = Guru;

var Signup;

Signup = new Schema({
    email: {type: String, index: { unique: true} }
});

module.exports.SignupSchema = Signup;
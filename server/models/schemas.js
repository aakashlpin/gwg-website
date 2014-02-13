var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId;

/* Schemas */
var Guru;

Guru = new Schema({
    email: String,
    name: String,
    password: String,
    photo: String
});

Guru.pre('save', function (next) {
    // Do something.
    next();
});

module.exports.GuruSchema = Guru;


var Signup;

Signup = new Schema({
    email: {type: String, index: { unique: true} }
});

module.exports.SignupSchema = Signup;
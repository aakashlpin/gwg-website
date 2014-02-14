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
    timezone: Number
});

module.exports.GuruSchema = Guru;


var Signup;

Signup = new Schema({
    email: {type: String, index: { unique: true} }
});

module.exports.SignupSchema = Signup;
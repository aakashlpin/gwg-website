var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId,
    Guru = require('./guru'),
    Course = require('./course'),
    _ = require('underscore'),
    TrackSchema,
    CourseSchema,
    Track
;

CourseSchema = new Schema({
    order: Number,
    _courseId: { type: ObjectId, ref: 'Course' }
    
});

TrackSchema = new Schema({
    name: String,
    description: String,
    fee: Number,
    courses: [ CourseSchema ]

});

Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Guru = require('./guru');

_ = require('underscore');

var Course, CourseSchema, SessionSchema, UploadSchema;

UploadSchema = new Schema({
    name: String,   //display name of uploaded media
    url: String,    //S3 url? 
    type: String   //type of media -> pdf/ image / doc / music track
    
}, {_id: false});

SessionSchema = new Schema({
    name: String,
    description: String,
    reference: {
        chords: [ String ], //C#, Bb, Ab7
        scales: [ String ],
        uploads: [ UploadSchema ]
    }
    
}, {_id: true});

CourseSchema = new Schema({
    _creator: { type: ObjectId, ref: 'Guru' },
    name: String,
    description: String,
    target_audience: [ String ],
    genres: [ String ],
    sessions: [ SessionSchema ],
    fee: Number,
    deleted: { type: Boolean, default: false }
});

CourseSchema.statics.post = function (req, callback) {
    //TODO
    var data, Course;
    data = _.pick(req.body, ['name', 'description', 'target_audience', 'classes', 'fee']);

    //assign the creator field from req object
    data._creator = req.user._id;

    Course = new this(data);
    Course.save(callback);
};

CourseSchema.statics.getById = function(courseId, fields, callback) {
    if (typeof fields === 'function') {
        callback = fields;
        fields = [];
    }

    if (!_.isArray(fields)) {
        //if just one field passed in instead of an array
        fields = [fields];
    }

    if (!courseId) {
        return callback('Cannot get without course id');
    }

    var fetchObject = {};
    _.each(fields, function(field) {
        fetchObject[field] = 1;
    });

    this.findById(courseId, fetchObject).lean().exec(callback);
};

CourseSchema.statics.put = function(req, callback) {
    var courseQuery = {_id: req.body._id};
    var updateData = _.pick(req.body, ['name', 'description', 'target_audience', 'classes', 'fee']);
    var updateDataOptions = {};
    this.findOneAndUpdate(courseQuery, updateData, updateDataOptions, callback);
};

CourseSchema.statics.del = function(req, callback) {
    var courseQuery = {_id: req.body._id};
    var updateParams = {deleted: true};
    var updateOptions = {};
    this.update(courseQuery, updateParams, updateOptions, callback);
};

CourseSchema.statics.getByCreator = function(req, callback) {
    //if coming via a req, use that object. Else, req would correspond to a an Id
    var guruId = req.user ? req.user._id : req;
    this.find({_creator: guruId, deleted: {$ne: true}}, callback);
};

Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
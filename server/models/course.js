var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Guru = require('./guru');

_ = require('underscore');

var Course, CourseSchema;

CourseSchema = new Schema({
    _creator: { type: ObjectId, ref: 'Guru' },
    name: String,
    description: String,
    target_audience: [{
        id: String,
        selected: Boolean,
        name: String
    }],
    classes: Number,
    fee: Number,
    deleted: { type: Boolean, default: false }
});

CourseSchema.statics.post = function (req, callback) {
    var data, Course;
    data = _.pick(req.body, ['name', 'description', 'target_audience', 'classes', 'fee']);

    //assign the creator field from req object
    data._creator = req.user._id;

    Course = new this(data);
    Course.save(callback);
};

CourseSchema.statics.getById = function(courseId, fields, callback) {
    if (!courseId) {
        return callback('Cannot get without course id');
    }

    if (typeof fields === 'function') {
        callback = fields;
        fields = [];
    }

    if (!_.isArray(fields)) {
        //if just one field passed in instead of an array
        fields = [fields];
    }

    var fetchObject = {};
    _.each(fields, function(field) {
        fetchObject[field] = 1;
    });

    this.findById(courseId, fetchObject, callback);
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
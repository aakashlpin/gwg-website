var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    Guru = require('./guru');

_ = require('underscore');

var Course, CourseSchema;

CourseSchema = new Schema({
    _creator: {type: ObjectId, ref: 'Guru'},
    name: String,
    description: String,
    target_audience: [{
        id: String,
        selected: Boolean,
        name: String
    }],
    classes: Number,
    fee: Number
});

CourseSchema.statics.post = function (req, callback) {
    var data, Course;
    data = _.pick(req.body, ['name', 'description', 'target_audience', 'classes', 'fee']);

    //assign the creator field from req object
    data._creator = req.user._id;

    Course = new this(data);
    Course.save(callback);
};

CourseSchema.statics.getByCreator = function(req, callback) {
    var guruId = req.user._id;
    this.find({_creator: guruId}, callback);
};

Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
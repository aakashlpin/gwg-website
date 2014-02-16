var mongoose = require('mongoose'),
    GuruSchema = require('./schemas').GuruSchema,
    winston = require('winston'),
    Guru;
_ = require('underscore');

var fs = require('fs');

var outputFilename = './my.txt';


GuruSchema.statics.get = function(req, api, callback) {
//    winston.add(winston.transports.File, { filename: 'guru.log' });
//    winston.remove(winston.transports.Console);
    console.log(req);
    fs.writeFile(outputFilename, JSON.stringify(req), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to ");
        }
    });
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

GuruSchema.statics.post = function(req, api, callback) {
    var data, Guru;
    data = _.pick(req.body, ['title', 'body']);

    Guru = new this(data);
    Guru.save(callback);



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

GuruSchema.statics.del = function(req, api, callback) {
    var id = req.param('id');
    if (!id) return callback('Cannot delete without id');

    this.update({_id: id}, {del: true}, callback);



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
            day_name: 'Monday'
        }, {
            day_code: 'tue',
            day_name: 'Tuesday'
        }, {
            day_code: 'wed',
            day_name: 'Wednesday'
        }, {
            day_code: 'thu',
            day_name: 'Thursday'
        }, {
            day_code: 'fri',
            day_name: 'Friday'
        }, {
            day_code: 'sat',
            day_name: 'Saturday'
        }, {
            day_code: 'sun',
            day_name: 'Sunday'
        } ];

        var data = new self(dataOfInterest);
        data.save(callback);
    });
};

Guru = mongoose.model('Guru', GuruSchema);

module.exports = Guru;
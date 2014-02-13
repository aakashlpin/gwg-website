var mongoose = require('mongoose'),
    GuruSchema = require('./schemas').GuruSchema,
    Guru;
_ = require('underscore');

GuruSchema.statics.get = function(req, api, callback) {
/*    var id = req.param('email');
    if (id) {
        this.findById(id).exec(callback);
    } else {
        this
            .find()
            .where('del', false)
            .exec(callback);
    }*/
};

GuruSchema.statics.post = function(req, api, callback) {
/*
    var data, Guru;
    data = _.pick(req.body, ['title', 'body']);

    Guru = new this(data);
    Guru.save(callback);
*/

};

GuruSchema.statics.put = function(req, api, callback) {
/*    var id, update, data, options, Guru;
    id = req.param('id');

    if (!id) return callback('Cannot update without id');

    update = {_id: id};
    data = _.pick(req.body, ['title', 'body']);
    options = {};

    this.update(update, data, options, callback);*/
};

GuruSchema.statics.del = function(req, api, callback) {
/*
    var id = req.param('id');
    if (!id) return callback('Cannot delete without id');

    this.update({_id: id}, {del: true}, callback);
*/

};

Guru = mongoose.model('Guru', GuruSchema);
module.exports = Guru;

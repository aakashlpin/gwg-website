var mongoose = require('mongoose'),
    SignupSchema = require('./schemas').SignupSchema,
    Signup;
_ = require('underscore');

SignupSchema.statics.post = function (req, callback) {
    var data, signup;
    data = _.pick(req.body, ['email']);

    signup = new this(data);
    this.findOne({email: data.email}, function(err, doc) {
        if (err) {
            //todo handle
        }
        if (!doc) {
            signup.save(callback);

        } else {
            callback(null, doc);
        }

    });
};

Signup = mongoose.model('Signup', SignupSchema);
module.exports = Signup;
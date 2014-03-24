var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require ('config'),
    SignupSchema,
    Signup;

_ = require('underscore');

SignupSchema = new Schema({
    email: {type: String, index: { unique: true} },
    signed_up_at: { type: Date, default: Date.now },    //updated
    spam: { type: Boolean, default: false } //updated: TODO build an admin function to mark email as spam
});

SignupSchema.statics.getAll = function(req, callback) {
    if (config.admin.emails.indexOf(req.user.email) < 0) {
        return callback('Unauthorized');
    }

    this.find().lean().exec(callback);
};

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
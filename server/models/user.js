var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require ('config');

_ = require('underscore');

var User, UserSchema, SlotSchema;

SlotSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    cancelled: { type: Boolean, default: false },
    completed: { type: Boolean, default: false }
});

UserSchema = new Schema({
    id: String,
    email: String,
    gender: String,
    name: String,
    timezone: Number,
    is_user: { type: Boolean, default: true },  //updated: field to allow/ reject person as a user
    picture: String,
    google: {
        access_token: {type: String}
    },
    reservations: [{
        courseId: Schema.ObjectId,
        slots: [SlotSchema],
        paid: { type: Boolean, default: false }
    }]
});

UserSchema.statics.put = function(req, fields, callback) {
    var id, update, data, options, User;
    id = req.user._id;

    if (!id) return callback('Cannot update without user id');

    update = {_id: id};
    data = _.pick(req.body, fields);
    options = {};

    this.update(update, data, options, callback);

};

UserSchema.statics.putReservations = function(req, callback) {
    var id, update, data, options;
    id = req.user._id;

    if (!id) return callback('Cannot update without user id');

    update = {_id: id};
    data = _.pick(req.body, 'reserved');

    options = {};

    this.update(update, {$push: {"reservations": data.reserved}}, options, callback);

};

UserSchema.statics.get = function(req, fields, callback) {
    var fieldObject = {};
    _.each(fields, function(field) {
        fieldObject[field] = 1;
    });

    this.findOne({_id: req.user._id}, fieldObject, callback);
};

UserSchema.statics.findOrCreate = function(accessToken, refreshToken, profile, callback) {
    var dataOfInterest = _.pick(profile._json,
        ['id', 'name', 'email', 'picture']
    );

    var self = this,
        email = dataOfInterest.email,
        emailQuery = {email: email};

    this.findOne(emailQuery, function(err, user) {
        if (err) {
            return callback(err, null);
        }

        if (user) {
            //depending on the provider, update the access_token and refresh_token fields
            var updateOnLoginData = {}, updateOnLoginOptions = {};
            updateOnLoginData[profile.provider] = {};
            updateOnLoginData[profile.provider].access_token = accessToken;

            if (profile.provider === 'google') {
                updateOnLoginData.picture = dataOfInterest.picture;
            }

            self.findOneAndUpdate(emailQuery, updateOnLoginData, updateOnLoginOptions, function(err, updatedUser) {
                if (err) {
                    console.error(err);
                    callback(err);
                    return;
                }
                callback(null, updatedUser);
            });

            return;
        }

        var data = new self(dataOfInterest);
        data.save(callback);
    });
};

UserSchema.statics.getAll = function(req, callback) {
    if (config.admin.emails.indexOf(req.user.email) < 0) {
        return callback('Unauthorized');
    }

    this.find(callback);
};

User = mongoose.model('User', UserSchema);

module.exports = User;
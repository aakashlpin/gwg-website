var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    config = require ('config'),
    Course = require('./course');

_ = require('underscore');

var Guru, GuruSchema;

GuruSchema = new Schema({
    id: String,
    username: String,
    email: String,
    alternate_email: String,
    gender: String,
    link: String,
    location: { id: {type: String}, name: {type: String} },
    name: String,
    timezone: Number,
    is_guru: { type: Boolean, default: true },  //updated: field to allow/ reject person as a guru
    picture: String,
    schedule: [{
        day_code: String,
        day_name: String,
        slots: [{
            startTime: String,
            endTime: String
        }],
        noSlots: Boolean,
        currentMode: String,
        selectedDayCode: String
    }],
    extras: {
        band_name: String,
        about_me: [{type: String}],
        links: [{type: String}]
    },
    soundcloud: {
        connected: {type: Boolean, default: false}, //has soundcloud been connected?
        permalink_url: {type: String},  //link to pass on to embed widget
        is_shown: {type: Boolean, default: false}    //is widget enabled in profile?
    },
    facebook: {
        access_token: {type: String}    //facebook doesn't send refresh tokens
    },
    google: {
        access_token: {type: String},
        refresh_token: {type: String}
    }
});

GuruSchema.statics.put = function(req, fields, callback) {
    var id, update, data, options, Guru;
    id = req.user._id;

    if (!id) return callback('Cannot update without user id');

    update = {_id: id};
    data = _.pick(req.body, fields);
    options = {};

    this.update(update, data, options, callback);

};

GuruSchema.statics.get = function(req, fields, callback) {
    var fieldObject = {};
    _.each(fields, function(field) {
        fieldObject[field] = 1;
    });

    this.findOne({_id: req.user._id}, fieldObject, callback);
};

GuruSchema.statics.findOrCreate = function(accessToken, refreshToken, profile, callback) {
    var dataOfInterest = _.pick(profile._json,
        ['id', 'name', 'gender', 'link', 'email', 'location', 'timezone', 'username', 'picture']
    );

    var self = this,
        email = dataOfInterest.email,
        emailQuery = {$or: [{email: email}, {alternate_email: email}]};

    this.findOne(emailQuery, function(err, user) {
        if (err) {
            return callback(err, null);
        }

        if (user) {
            //depending on the provider, update the access_token and refresh_token fields
            var updateOnLoginData = {}, updateOnLoginOptions = {};
            updateOnLoginData[profile.provider] = {};
            updateOnLoginData[profile.provider].access_token = accessToken;
            //check for refresh token
            if (refreshToken) {
                //if exists, use it
                updateOnLoginData[profile.provider].refresh_token = refreshToken;
            } else if(user[profile.provider].refresh_token) {
                //else use the existing token for db request
                updateOnLoginData[profile.provider].refresh_token = user[profile.provider].refresh_token;
            }

            if (profile.provider === 'facebook') {
                updateOnLoginData.picture = '//graph.facebook.com/'+ user.username +'/picture';

            } else if (profile.provider === 'google') {
                updateOnLoginData.picture = dataOfInterest.picture;
            }

            self.findOneAndUpdate(emailQuery, updateOnLoginData, updateOnLoginOptions, function(err, updatedUser) {
                if (err) {
                    console.error(err);
                }
                updatedUser.exists = true;    //send a note to client to not start the on-boarding experience
                callback(null, updatedUser);
            });

            return;
        }

        dataOfInterest.schedule = [ {
            day_code: 'mon',
            day_name: 'Monday',
            slots: [{
                startTime: '08:00 AM',
                endTime: '09:00 AM'
            }],
            currentMode: 'manual',
            noSlots: false
        }, {
            day_code: 'tue',
            day_name: 'Tuesday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'wed',
            day_name: 'Wednesday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'thu',
            day_name: 'Thursday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'fri',
            day_name: 'Friday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'sat',
            day_name: 'Saturday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        }, {
            day_code: 'sun',
            day_name: 'Sunday',
            currentMode: 'copy',
            selectedDayCode: 'mon',
            noSlots: false
        } ];

        var data = new self(dataOfInterest);
        data.save(callback);
    });
};

GuruSchema.statics.getAll = function(req, callback) {
    if (req.user.email !== config.admin.email) {
        return callback('Unauthorized');
    }

    this.find(callback);
};

Guru = mongoose.model('Guru', GuruSchema);

module.exports = Guru;
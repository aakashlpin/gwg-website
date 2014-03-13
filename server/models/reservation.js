var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    config = require('config');

var _ = require('underscore');

var Reservation, SlotSchema, ReservationSchema;

SlotSchema = new Schema({
    start       : { type: Date, required: true },
    end         : { type: Date, required: true },
    cancelled   : { type: Boolean, default: false },
    completed   : { type: Boolean, default: false }
});

ReservationSchema = new Schema({
    studentId   : { type: ObjectId, required: true },
    guruId      : { type: ObjectId, required: true },
    courseId    : { type: ObjectId, required: true },
    slots       : [ SlotSchema ],
    paid        : { type: Boolean, default: false }
});

ReservationSchema.statics.putReservations = function(reservedObj, callback) {
    var data = _.pick(reservedObj, ['studentId', 'guruId', 'courseId', 'slots']);

    data.slots = data.slots.map(function(slot) {
        //delete the fullCalendar id if coming in from client
        delete slot._id;
        return slot;
    });

    var Reservation = new this(data);
    Reservation.save(function(err, savedObject) {
        if (err) {
            console.log('reservation model error', err);
        }
        callback(err, savedObject);
    });
};

Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;
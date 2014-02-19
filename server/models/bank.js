var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,
    ObjectId = Schema.ObjectId,
    Guru = require('./guru');

_ = require('underscore');

var Bank, BankSchema;

BankSchema = new Schema({
    _creator: {type: ObjectId, ref: 'Guru'},
    country: String,
    mode_of_payment: String,
    beneficiary_name: String,
    account_number: String,
    bank_name: String,
    bank_branch: String,
    bank_address: String,
    ifsc_code: String,
    pan_number: String
});

BankSchema.statics.post = function (req, callback) {
    var data, Bank;
    data = _.pick(req.body, ['country', 'mode_of_payment', 'beneficiary_name', 'account_number', 'bank_name'
        , 'bank_branch', 'bank_address', 'ifsc_code', 'pan_number']);

    //assign the creator field from req object
    data._creator = req.user._id;

    Bank = new this(data);
    Bank.save(callback);
};

BankSchema.statics.getByCreator = function(req, callback) {
    var guruId = req.user._id;
    this.find({_creator: guruId}, callback);
};

Bank = mongoose.model('Bank', BankSchema);
module.exports = Bank;
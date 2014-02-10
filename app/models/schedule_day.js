var BaseModel = require('./base');

module.exports = BaseModel.extend({
    idAttribute: 'dayCode'
});

module.exports.id = 'ScheduleDay';
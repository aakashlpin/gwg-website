var BaseCollection = require( './base'),
    ScheduleDay = require('../models/schedule_day');

module.exports = BaseCollection.extend( {
    model: ScheduleDay,
	url: '/days'
} );

module.exports.id = 'ScheduleDays';
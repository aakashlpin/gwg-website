var BaseCollection = require( './base'),
    ScheduleDay = require('../models/schedule_day');

module.exports = BaseCollection.extend( {
	url: '/gurus'
} );

module.exports.id = 'ScheduleDays';
/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    TimePicker = require('bootstrap.timepicker');

module.exports = Marionette.ItemView.extend({
    template: templates.guruScheduleTimeSlot,
    templateHelpers: function () {
        if (this.model) return {};
        return {
            startTime: '08:00 AM',
            endTime: '10:00 AM'
        }
    }
});
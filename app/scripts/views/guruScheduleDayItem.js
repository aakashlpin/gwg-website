/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone'),
    TimeSlotView = require('./guruScheduleTimeSlot');

module.exports = Marionette.ItemView.extend({
    className: 'day-slots-container',
    template: templates.guruScheduleDayItem,
    events: {
        'click .addNewSlot': 'actionOnAddNewTimeSlot'
    },
    ui: {
        daySlotsContainer: '.daySlotsContainer'
    },
    onRender: function () {
        this._initSlot();
    },
    _initSlot: function () {
        this.ui.daySlotsContainer.html(new TimeSlotView().render().el);

    },
    actionOnAddNewTimeSlot: function (e) {
        e.preventDefault();

    }
});
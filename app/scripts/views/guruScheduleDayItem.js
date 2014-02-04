/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone');

module.exports = Marionette.ItemView.extend({
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

    },
    actionOnAddNewTimeSlot: function (e) {
        e.preventDefault();

    }
});
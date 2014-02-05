/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone'),
    TimeSlotView = require('./guruScheduleTimeSlot'),
    moment = require('moment');

module.exports = Marionette.ItemView.extend({
    className: 'day-slots-container',
    template: templates.guruScheduleDayItem,
    events: {
        'click .addNewSlot': 'actionOnAddNewTimeSlot'
    },
    ui: {
        daySlotsContainer: '.daySlotsContainer'
    },
    initialize: function () {
        this.subViews = {};
    },
    onRender: function () {
        this._initSlot();
    },
    _initSlot: function () {
        var startTime = '09:00 AM',
            endTime = '10:00 AM';
        
        this.ui.daySlotsContainer.html(this._getTimeSlotView(startTime, endTime).render().el);

    },
    _getTimeSlotView: function (startTime, endTime) {
        return this.subViews[endTime] = new TimeSlotView({
            model: this._addSlot(startTime, endTime)
        });

    },
    _addSlot: function (startTime, endTime) {
        if (!(this.model.get('slots') instanceof Backbone.Collection)) {
            this.model.set('slots', new Backbone.Collection());
        }

        var slotToAdd = this._getModelForTimeSlot(startTime, endTime);
        this.model.get('slots').add(slotToAdd);

        return slotToAdd;

    },
    _getModelForTimeSlot: function (startTime, endTime) {
        return new Backbone.Model({
            date_startTime: moment(startTime, 'hh:mm A'),
            date_endTime: moment(endTime, 'hh:mm A'),
            startTime: startTime,
            endTime: endTime
        });
    },
    actionOnAddNewTimeSlot: function (e) {
        e.preventDefault();
        var takenSlots = this.model.get('slots');
        var minHour = takenSlots.max(function (takenSlot) {
            return takenSlot.get('date_endTime').hours();
        });

        var startTime = minHour.get('endTime'),
            endTime = minHour.get('date_endTime').add('hours', 1).format('hh:mm A');

        //undo changes done to the original object
        minHour.get('date_endTime').subtract('hours', 1);

        this.ui.daySlotsContainer.append(this._getTimeSlotView(startTime, endTime).render().el);
    }
});
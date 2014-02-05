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
    moment = require('moment'),
    vent = require('../vent');

module.exports = Marionette.ItemView.extend({
    className: 'day-slots-container',
    template: templates.guruScheduleDayItem,
    t_copyModeTemplate: templates.guruScheduleDayItemCopyMode,
    events: {
        'click .addNewSlot': 'actionOnAddNewTimeSlot'
    },
    ui: {
        daySlotsContainer: '.daySlotsContainer',
        copyModeContainer: '.copyModeContainer',
        addNewSlotLink: '.addNewSlot'
    },
    initialize: function () {
        this.subViews = {};
        this.modes = {
            COPY: 'copy',
            MANUAL: 'manual'
        };

    },
    initSlot: function () {
        var startTime = '09:00 AM',
            endTime = '10:00 AM';

        this.ui.daySlotsContainer.html(this._getTimeSlotView(startTime, endTime).render().el);

    },
    startCopyMode: function (modelsWithFilledSlots) {
        this._switchMode(this.modes.COPY);
        this.ui.copyModeContainer.html(this.t_copyModeTemplate({days: modelsWithFilledSlots}));

    },
    _getTimeSlotView: function (startTime, endTime) {
        return this.subViews[endTime] = new TimeSlotView({
            model: this._addSlot(startTime, endTime)
        });

    },
    _addSlot: function (startTime, endTime) {
        if (!(this.model.get('slots') instanceof Backbone.Collection)) {
            this.collection = new Backbone.Collection();
            this.collection.on('add remove', function(model) {
                vent.trigger('schedule:time:change', this.model, model);

            }, this);

            this.model.set('slots', this.collection);
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
    _switchMode: function (mode) {
        switch (mode) {
            case this.modes.COPY:
                this.ui.daySlotsContainer.empty().hide();
                this.ui.copyModeContainer.show();
                break;
            case this.modes.MANUAL:
                this.ui.copyModeContainer.empty().hide();
                this.ui.daySlotsContainer.show();
                break;
        }
    },
    actionOnAddNewTimeSlot: function (e) {
        e.preventDefault();
        var takenSlots = this.model.get('slots');
        if (!takenSlots || !takenSlots.size()) {
            this._switchMode(this.modes.MANUAL);
            this.initSlot();
            return;
        }

        var minHour = takenSlots.max(function (takenSlot) {
            return takenSlot.get('date_endTime').hours();
        });

        var startTime = minHour.get('endTime'),
            endTime = minHour.get('date_endTime').add('hours', 1).format('hh:mm A');

        //undo changes done to the original object
        minHour.get('date_endTime').subtract('hours', 1);

        this.ui.daySlotsContainer.append(this._getTimeSlotView(startTime, endTime).render().el);

    },
    onClose: function () {
        _.each(_.values(this.subViews), function (subView) {
            if ('close' in subView) {
                subView.close();
            }
        })
    }
});
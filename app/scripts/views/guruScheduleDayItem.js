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
    t_noSlotsTemplate: templates.guruScheduleDayItemNoSlots,
    events: {
        'click .copyModeContainer a': 'actionOnChangeCopyFromDay',
        'click .addNewSlot'         : 'actionOnAddNewTimeSlot',
        'click .clearAllDaySlots'   : 'actionOnClearAllDaySlots'
    },
    ui: {
        daySlotsContainer: '.daySlotsContainer',
        copyModeContainer: '.copyModeContainer'
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
    actionOnClearAllDaySlots: function () {
        this.model.unset('slots');
        this.model.set({
            noSlots: true
        });

        this._switchMode(this.modes.COPY);
        this.ui.copyModeContainer.html(this.t_noSlotsTemplate());
        vent.trigger('schedule:day:slot', this.model);

    },
    actionOnChangeCopyFromDay: function (e) {
        e.preventDefault();
        this.selectedDayCode = $(e.target).data('daycode');
        this._manageSelectedDay();

    },
    startCopyMode: function (modelsWithFilledSlots) {
        this._switchMode(this.modes.COPY);
        this.ui.copyModeContainer.html(this.t_copyModeTemplate({days: modelsWithFilledSlots}));
        this._manageSelectedDay();

    },
    _manageSelectedDay: function () {
        //reset selections
        this.ui.copyModeContainer.find('a').removeClass('selected');
        //get first child
        var firstChild = this.ui.copyModeContainer.find('li:first-child a');
        //set selectedDayCode
        this.selectedDayCode = this.selectedDayCode || firstChild.data('daycode');
        //attempt to get DOM
        var childInDOM = this.ui.copyModeContainer.find('a[data-daycode="'+ this.selectedDayCode +'"]');
        //if no such elem found in DOM, set selectedDayCode to first child
        var elemToSelect = childInDOM;
        if (!childInDOM.length) {
            elemToSelect = firstChild;
            this.selectedDayCode = firstChild.data('daycode');
        }
        //finally highlight the appropriate child
        elemToSelect.addClass('selected');
        //mark the selectedDayCode in model
        this.model.set({
            selectedDayCode: this.selectedDayCode
        });
    },
    _getTimeSlotView: function (startTime, endTime) {
        return this.subViews[endTime] = new TimeSlotView({
            model: this._addSlot(startTime, endTime)
        });

    },
    _addSlot: function (startTime, endTime) {
        if (!(this.model.get('slots') instanceof Backbone.Collection) || this.model.get('noSlots')) {
            this.collection = new Backbone.Collection();
            this.collection.on('add remove', function(model) {
                if (!this.model.get('slots').size()) {
                    this.actionOnClearAllDaySlots();
                }
                vent.trigger('schedule:time:change', this.model, model);

            }, this);

            this.model.set('slots', this.collection);
            this.model.unset('noSlots');
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
        this.currentMode = mode;
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

        this.model.set({
            currentMode: this.currentMode
        });
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
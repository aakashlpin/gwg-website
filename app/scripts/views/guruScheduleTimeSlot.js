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
    TimePicker = require('bootstrap.timepicker'),
    moment = require('moment');

module.exports = Marionette.ItemView.extend({
    template: templates.guruScheduleTimeSlot,
    events: {
        'change.bfhtimepicker': 'actionOnChangeTime'
    },
    onRender: function () {
        var timepicker = this.$el.find('div.bfh-timepicker');
        var _this = this;
        timepicker.each(function() {
            var _timepicker = $(this);
            _timepicker.bfhtimepicker({
                icon: '',
                time: _this.model.get(_timepicker.data('type')),
                mode: '12h'
            });
        });

    },
    actionOnChangeTime: function (e) {
        var target = $(e.target),
            targetType = target.data('type'),
            targetValue = target.find('.bfh-timepicker-toggle input').val();

        var modelChanges = {};
        modelChanges[targetType] = targetValue;
        modelChanges['date_' + targetType] = moment(targetValue, 'hh:mm A');
        this.model.set(modelChanges);
    }
});
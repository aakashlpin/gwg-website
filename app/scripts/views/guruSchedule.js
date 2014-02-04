/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone'),
    GuruScheduleDaysView = require('./guruScheduleDays');

module.exports = Marionette.ItemView.extend({
    className: 'site-wrapper',
    template: templates.guruSchedule,
    events: {
    },
    ui: {
        scheduleCreatorContainer: '#scheduleCreator'
    },
    initialize: function () {
        this.subViews = {};
    },
    onRender: function () {
        var daysCollection = [
            { dayCode: 'mon', dayName: 'Monday' },
            { dayCode: 'tue', dayName: 'Tuesday' },
            { dayCode: 'wed', dayName: 'Wednesday' },
            { dayCode: 'thu', dayName: 'Thursday' },
            { dayCode: 'fri', dayName: 'Friday' },
            { dayCode: 'sat', dayName: 'Saturday' },
            { dayCode: 'sun', dayName: 'Sunday' }
        ];

        var scheduleCollection = new Backbone.Collection(daysCollection);

        this.subViews.scheduleCreatorDaysView = new GuruScheduleDaysView({
            collection: scheduleCollection
        });

        this.ui.scheduleCreatorContainer.html(this.subViews.scheduleCreatorDaysView.render().el);

    },
    onClose: function () {
        _.each(_.values(this.subViews), function (subView) {
            if ('close' in subView) {
                subView.close();
            }
            if ('remove' in subView) {
                subView.remove();
            }
        }, this);
    }
});
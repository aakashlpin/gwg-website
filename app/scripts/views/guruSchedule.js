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
        'click #saveSchedule': 'actionOnSaveSchedule'
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

        this.collection = new Backbone.Collection(daysCollection);

        this.subViews.scheduleCreatorDaysView = new GuruScheduleDaysView({
            collection: this.collection
        });

        this.ui.scheduleCreatorContainer.html(this.subViews.scheduleCreatorDaysView.render().el);

    },
    actionOnSaveSchedule: function (e) {
        e.preventDefault();
        console.log(this.collection.toJSON());
        App.router.navigate('g/2', {trigger: true});

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
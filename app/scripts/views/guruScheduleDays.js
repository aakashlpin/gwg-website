/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone'),
    GuruScheduleDayItem = require('./guruScheduleDayItem'),
    vent = require('../vent');

module.exports = Marionette.CollectionView.extend({
    itemView: GuruScheduleDayItem,
    initialize: function () {
        this.listenTo(vent, 'schedule:time:change', this.actionOnChangeInSlots);
    },
    onRender: function () {
        var firstDay = this.children.findByIndex(0);
        firstDay.initSlot();

    },
    actionOnChangeInSlots: function (childModel, timeModel) {
        console.log(childModel.toJSON(), timeModel.toJSON());
    }
});
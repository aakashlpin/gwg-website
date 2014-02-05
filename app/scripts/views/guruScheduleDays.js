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
        //get all empty day models and notify them of model of days with filled slots
        _.each(this.collection
            .reject(function (model) {
                //only if current child has filled slots, exclude that from current processing
                if (childModel.get('slots').size())
                    return model.get('dayCode') === childModel.get('dayCode');

                return false;
            }),
            function (otherChildModel) {
                if (!otherChildModel.get('slots') || !otherChildModel.get('slots').size()) {
                    //if other child model is empty
                    var otherChildView = this.children.findByModel(otherChildModel);
                    otherChildView.startCopyMode(this._daysHavingFilledSlots());
                }
            }, this);

    },
    _daysHavingFilledSlots: function () {
        return this.collection.filter(function (model) {
            return model.get('slots') && model.get('slots').size();
        });
    }
});
/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    _ = require('underscore'),
    App = require('../main'),
    Backbone = require('backbone'),
    GuruScheduleDayItem = require('./guruScheduleDayItem');

module.exports = Marionette.CollectionView.extend({
    itemView: GuruScheduleDayItem

});
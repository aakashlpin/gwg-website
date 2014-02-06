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
    className: 'site-wrapper',
    template: templates.guruCourses,
    events: {
    },
    ui: {
    },
    initialize: function () {
        this.subViews = {};
    }
});
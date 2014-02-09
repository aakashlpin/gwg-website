'use strict';

var $ = require('jquery'),
    Backbone = require('backbone');

//Backbone.$ = $;

var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        ''      : 'home',
        'g'     : 'onBoardGuru',
        'g/1'   : 'onBoardGuruSchedule',
        'g/2'   : 'onBoardGuruCourses'
    }
});
/**
 * Created by aakash on 2/3/14.
 */

'use strict';

var HomeHandler = require('./handlers/homeHandler');
var GuruHandler = require('./handlers/guruHandler');
var Marionette = require('backbone.marionette');

module.exports = Marionette.Controller.extend({
    home: function () {
        HomeHandler.putHomePageView();
    },
    onBoardGuru: function () {
        GuruHandler.putHomePageView();
    },
    onBoardGuruSchedule: function () {
        GuruHandler.putGuruScheduleView();
    }
});
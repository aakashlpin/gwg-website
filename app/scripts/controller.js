/**
 * Created by aakash on 2/3/14.
 */

'use strict';

var HomeHandler = require('./handlers/homeHandler');

module.exports = {
    home: function () {
        HomeHandler.putHomePageView();
    }
};
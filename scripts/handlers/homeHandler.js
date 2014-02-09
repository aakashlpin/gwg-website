'use strict';

module.exports = {
    putHomePageView: function () {
        var HomePageView    = require('../views/home'),
            App             = require('../main');

        App.content.show(new HomePageView());
    }
};
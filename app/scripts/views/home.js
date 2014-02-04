/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates'),
    $ = require('jquery'),
    App = require('../main');

module.exports = Marionette.ItemView.extend({
    className: 'site-wrapper',
    template: templates.home,
    events: {
        'click #primary-nav': 'actionOnNav'
    },
    actionOnNav: function (e) {
        e.preventDefault();
        var target = $(e.target),
            href = target.attr('href'),
            goTo = href.substr(1, href.length);

        if (!target.is('a')) {
            return;
        }

        App.router.navigate(goTo, {trigger: true});

    }
});
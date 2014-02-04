/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var Marionette = require('backbone.marionette'),
    templates = require('../templates');


module.exports = Marionette.ItemView.extend({
    className: 'site-wrapper',
    template: templates.guruHome
});
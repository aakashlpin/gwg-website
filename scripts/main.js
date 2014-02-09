/**
 * Created by aakash on 2/3/14.
 */
'use strict';

var $ = require('jquery'),
    Backbone = require('backbone'),
    Router = require('./router'),
    Controller = require('./controller');

//Backbone.$ = $;

var Marionette = require('backbone.marionette');

var router = new Router({
    controller: new Controller()
});

var app = new Marionette.Application({
    router: router
});

app.addRegions({
    content: '#content'
});

module.exports = app;

Backbone.history.start({
    pushState: true,
    hashChange: false
});


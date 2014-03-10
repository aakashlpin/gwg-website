var RouteUtils = require('../routeUtils');

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    routes = [];

fs.readdirSync(__dirname).forEach(function(file) {
    var fileName = path.basename(file, '.js');
    //grab all the files beginning with API
    if (fileName === 'ApiRoutersAggregator' || fileName.indexOf('Api') !== 0) {
        return;
    }

    //push the exports into an array. it's an object with method names as keys
    routes.push(require('./' + file))
});

module.exports = function(app) {
    routes = _.flatten([routes]);
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('api', routes));
};
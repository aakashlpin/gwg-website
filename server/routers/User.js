var UserController = require('../controllers/UserController'),
    AuthController = require('../controllers/AuthController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/home',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, UserController.getUserHome]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('u', routes));
};
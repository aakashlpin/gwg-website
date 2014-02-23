var AuthController = require('../controllers/AuthController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/facebook',
        httpMethod: 'GET',
        middleware: [AuthController.passportAuthMiddleWare]
    },
    {
        path: '/facebook/callback',
        httpMethod: 'GET',
        middleware: [AuthController.passportAuthCallbackMiddleWare, AuthController.authCallbackMiddleWare]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('auth', routes));
};
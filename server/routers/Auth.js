var AuthController = require('../controllers/AuthController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/facebook',
        httpMethod: 'GET',
        middleware: [AuthController.passportFBAuthMiddleWare]
    },
    {
        path: '/facebook/callback',
        httpMethod: 'GET',
        middleware: [AuthController.passportFBAuthCallbackMiddleWare, AuthController.authCallbackMiddleWare]
    },
    {
        path: '/google',
        httpMethod: 'GET',
        middleware: [AuthController.passportGoogleAuthMiddleWare]
    },
    {
        path: '/google/callback',
        httpMethod: 'GET',
        middleware: [AuthController.passportGoogleAuthCallbackMiddleWare, AuthController.authCallbackMiddleWare]
    },
    {
        path: '/user/google',
        httpMethod: 'GET',
        middleware: [AuthController.passportUserGoogleAuthMiddleWare]
    },
    {
        path: '/user/google/callback',
        httpMethod: 'GET',
        middleware: [AuthController.passportUserGoogleAuthCallbackMiddleWare, AuthController.authUserCallbackMiddleWare]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('auth', routes));
};
var HomeController = require('../controllers/HomeController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/',
        httpMethod: 'GET',
        middleware: [HomeController.getIndex]
    },
    {
        path: '/404',
        httpMethod: 'GET',
        middleware: [HomeController.get404]
    },
    {
        path: '/g',
        httpMethod: 'GET',
        middleware: [HomeController.getGuruIndex]
    },
    {
        path: '/about',
        httpMethod: 'GET',
        middleware: [HomeController.getAbout]
    },
    {
        path: '/logout',
        httpMethod: 'GET',
        middleware: [HomeController.logOutHandler]
    },
    {
        path: '/door',
        httpMethod: 'GET',
        middleware: [HomeController.getUserDoor]
    },
    {
        path: '/u',
        httpMethod: 'GET',
        middleware: [HomeController.getUserHome]
    },
    {
        path: '/:username',
        httpMethod: 'GET',
        middleware: [HomeController.validateUserNameRoute, HomeController.getGuruProfile]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, routes);
};
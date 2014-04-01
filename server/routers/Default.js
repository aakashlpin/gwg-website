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
        path: '/u',
        httpMethod: 'GET',
        middleware: [HomeController.getUserIndex]
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
/*    {
        path: '/events',
        httpMethod: 'GET',
        middleware: [HomeController.getEventsHandler]
    },*/
    {
        path: '/tuner',
        httpMethod: 'GET',
        middleware: [HomeController.getTunerHandler]
    },
    {
        path: '/new',
        httpMethod: 'GET',
        middleware: [HomeController.getNewIndex]
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
var HomeController = require('../controllers/HomeController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/',
        httpMethod: 'GET',
        middleware: [HomeController.getIndex]
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
    }

];

module.exports = function(app) {
    RouteUtils.initRoutes(app, routes);
};
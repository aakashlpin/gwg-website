var GuruController = require('../controllers/GuruController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/schedule',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, GuruController.getScheduleHandler]
    },
    {
        path: '/courses',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, GuruController.getCourseHandler]
    },
    {
        path: '/bank',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, GuruController.getBankHandler]
    },
    {
        path: '/profile',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, GuruController.getProfileHandler]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('g', routes));
};
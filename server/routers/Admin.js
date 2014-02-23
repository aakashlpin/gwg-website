var AdminController = require('../controllers/AdminController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/signups',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, AdminController.getSignupsHandler]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('admin', routes));
};
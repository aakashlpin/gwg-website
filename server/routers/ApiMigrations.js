var APIMigrationsController = require('../controllers/APIMigrationsController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/assignUserNames',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAdmin, APIMigrationsController.assignUserNames]
    }
];

module.exports = (function() {
    return RouteUtils.getNameSpacedRoutes('migration', routes)
})();
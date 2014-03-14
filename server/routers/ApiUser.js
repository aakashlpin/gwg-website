var APIUserController = require('../controllers/APIUserController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/schedule',
        httpMethod: 'POST',
        middleware: [APIUserController.postUserScheduleHandler]
    },
    {
        path: '/reservations',
        httpMethod: 'GET',
        middleware: [APIUserController.getUserReservationsHandler]
    }
];

module.exports = (function() {
    return RouteUtils.getNameSpacedRoutes('user', routes)
})();
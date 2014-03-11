var APIUserController = require('../controllers/APIUserController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/schedule',
        httpMethod: 'POST',
        middleware: [APIUserController.postUserScheduleHandler]
    }
];

module.exports = (function() {
    return RouteUtils.getNameSpacedRoutes('user', routes)
})();
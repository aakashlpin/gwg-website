var AdminController = require('../controllers/AdminController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/signups',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAdmin, AdminController.getSignupsHandler]
    }/*,
    {
        path: '/migrateSchedule',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAdmin, AdminController.migrateScheduleToNewSchema]
    }*/,
    {
        path: '/emails/notify',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAdmin, AdminController.notifyAllUsersAboutEvent]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('admin', routes));
};
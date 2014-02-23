var APIController = require('../controllers/APIController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/user',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getUserHandler]
    },
    {
        path: '/signup',
        httpMethod: 'POST',
        middleware: [APIController.postSignupHandler]
    },
    {
        path: '/guru/course',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruCourseHandler]
    },
    {
        path: '/guru/courses',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getGuruCourseHandler]
    },
    {
        path: '/guru/bank',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruBankHandler]
    },
    {
        path: '/guru/bank',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getGuruBankHandler]
    },
    {
        path: '/guru/schedule',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruScheduleHandler]
    },
    {
        path: '/guru/schedule',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getGuruScheduleHandler]
    },
    {
        path: '/guru/profile',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruProfileHandler]
    },
    {
        path: '/guru/profile',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getGuruProfileHandler]
    },
    {
        path: '/guru/soundcloud',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruSoundCloudHandler]
    },
    {
        path: '/guru/soundcloud',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getGuruSoundCloudHandler]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('api', routes));
};
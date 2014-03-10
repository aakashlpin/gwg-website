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
        path: '/guru/course',
        httpMethod: 'PUT',
        middleware: [RouteUtils.ensureAuthenticated, APIController.putGuruCourseHandler]
    },
    {
        path: '/guru/course',
        httpMethod: 'DELETE',
        middleware: [RouteUtils.ensureAuthenticated, APIController.deleteGuruCourseHandler]
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
    },
    {
        path: '/guru/youtube',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruYoutubeHandler]
    },
    {
        path: '/guru/youtube',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIController.getGuruYoutubeHandler]
    },
    {
        path: '/guru/accounts',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIController.postGuruAccountHandler]
    },
    {
        path: '/public/soundcloud',
        httpMethod: 'GET',
        middleware: [APIController.getPublicSoundCloudHandler]
    },
    {
        path: '/public/youtube',
        httpMethod: 'GET',
        middleware: [APIController.getPublicYouTubeHandler]
    },
    {
        path: '/public/schedule',
        httpMethod: 'GET',
        middleware: [APIController.getPublicScheduleHandler]
    },
    {
        path: '/public/courses',
        httpMethod: 'GET',
        middleware: [APIController.getPublicCoursesHandler]
    }
];

module.exports = function(app) {
    RouteUtils.initRoutes(app, RouteUtils.getNameSpacedRoutes('api', routes));
};
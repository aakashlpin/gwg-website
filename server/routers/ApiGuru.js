var APIGuruController = require('../controllers/APIGuruController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/user',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getUserHandler]
    },
    {
        path: '/course',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruCourseHandler]
    },
    {
        path: '/course',
        httpMethod: 'PUT',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.putGuruCourseHandler]
    },
    {
        path: '/course',
        httpMethod: 'DELETE',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.deleteGuruCourseHandler]
    },
    {
        path: '/courses',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruCourseHandler]
    },
    {
        path: '/bank',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruBankHandler]
    },
    {
        path: '/bank',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruBankHandler]
    },
    {
        path: '/schedule',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruScheduleHandler]
    },
    {
        path: '/schedule',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruScheduleHandler]
    },
    {
        path: '/profile',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruProfileHandler]
    },
    {
        path: '/profile',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruProfileHandler]
    },
    {
        path: '/soundcloud',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruSoundCloudHandler]
    },
    {
        path: '/soundcloud',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruSoundCloudHandler]
    },
    {
        path: '/youtube',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruYoutubeHandler]
    },
    {
        path: '/youtube',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruYoutubeHandler]
    },
    {
        path: '/accounts',
        httpMethod: 'POST',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.postGuruAccountHandler]
    },
    {
        path: '/reservations',
        httpMethod: 'GET',
        middleware: [RouteUtils.ensureAuthenticated, APIGuruController.getGuruReservationsHandler]
    }
];

module.exports = (function() {
    return RouteUtils.getNameSpacedRoutes('guru', routes)
})();
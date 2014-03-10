var APIPublicController = require('../controllers/APIPublicController'),
    RouteUtils = require('../routeUtils');

var routes = [
    {
        path: '/signup',
        httpMethod: 'POST',
        middleware: [APIPublicController.postSignupHandler]
    },
    {
        path: '/soundcloud',
        httpMethod: 'GET',
        middleware: [APIPublicController.getPublicSoundCloudHandler]
    },
    {
        path: '/youtube',
        httpMethod: 'GET',
        middleware: [APIPublicController.getPublicYouTubeHandler]
    },
    {
        path: '/schedule',
        httpMethod: 'GET',
        middleware: [APIPublicController.getPublicScheduleHandler]
    },
    {
        path: '/courses',
        httpMethod: 'GET',
        middleware: [APIPublicController.getPublicCoursesHandler]
    }
];

module.exports = (function() {
    return RouteUtils.getNameSpacedRoutes('public', routes)
})();
var _ = require('underscore');

module.exports.initRoutes = function(app, routes) {
    _.each(routes, function(route) {
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    })
};

module.exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();

    } else {
        res.redirect('/g');
    }
};

module.exports.ensureUserAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();

    } else {
        res.redirect('/door');
    }
};

module.exports.getNameSpacedRoutes = function(namespace, routes) {
    return _.map(routes, function(route) {
        route.path = '/' + namespace + route.path;
        return route;
    });
};
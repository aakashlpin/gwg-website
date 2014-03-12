var _ = require('underscore'),
    config = require('config');

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
    function isGuru(user) {
        return typeof user.is_guru === "boolean";
    }

    function isUser(user) {
        return typeof user.is_user === "boolean";
    }

    if (req.isAuthenticated()) {
        //figure out if it's a guru or an user
        if (isGuru(req.user)) {
            //make sure the requested path doesn't have a `/u` to begin with
            if (req.route.path.indexOf('/u') === 0) {
                return res.redirect('/g');
            }

        } else if (isUser(req.user)) {
            //make sure the requested path doesn't have a `/g/*` to begin with
            if (req.route.path.indexOf('/g/') === 0) {
                return res.redirect('/u/home');
            }

        } else {
            //bitches be logging in?
            //log em out
        }

        next();

    } else {
        console.error('UnAuthenticated request attempted');
        res.redirect('/g');
    }
};

module.exports.ensureAdmin = function(req, res, next) {
    if (!req.isAuthenticated() || config.admin.emails.indexOf(req.user.email) < 0 ) {
        res.redirect('/');
        return;
    }

    next();
};

module.exports.getNameSpacedRoutes = function(namespace, routes) {
    return _.map(routes, function(route) {
        route.path = '/' + namespace + route.path;
        return route;
    });
};
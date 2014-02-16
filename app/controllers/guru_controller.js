var _ = require('underscore');

function ensureUserIsLoggedIn(actionHandler) {
    return function () {
        var router = this,
            user = router.app.get('user');

        if (!_.isObject(user)){
            router.redirectTo('/g');

        } else {
            actionHandler.apply(this, arguments);
        }
    };
}

module.exports = {
    index: function ( params, callback ) {
        callback();
    },
    schedule: ensureUserIsLoggedIn( function ( params, callback ) {
        var spec = {
            collection: {
                collection: 'ScheduleDays', params: {_id: this.app.get('user')._id}
            }
        };

        this.app.fetch( spec, function ( err, result ) {
            callback(null, result);
        });

    }),
    courses: ensureUserIsLoggedIn(function ( params, callback ) {
        callback();
    })
};
function ensureUserIsLoggedIn(actionHandler) {
    return function () {
        var router = this,
            user = router.app.user;

        console.log(router.app);
//        if (!user.isLoggedIn()) {
//            router.redirectTo('/g');
//        } else {
            actionHandler.apply(this, arguments);
//        }
    };
}


module.exports = {
	index: function ( params, callback ) {
		callback();
	},
	schedule: ensureUserIsLoggedIn( function ( params, callback ) {
		var spec = {
			collection: {
				collection: 'ScheduleDays'
			}
		};

		this.app.fetch( spec, function ( err, result ) {
			callback( err, result );
		} )
	}),
    courses: function ( params, callback ) {
        callback();
    }
};
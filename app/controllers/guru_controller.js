module.exports = {
	index: function ( params, callback ) {
		callback();
	},
	schedule: function ( params, callback ) {
		var spec = {
			collection: {
				collection: 'ScheduleDays'
			}
		};

		this.app.fetch( spec, function ( err, result ) {
			callback( err, result );
		} )
	},
    courses: function ( params, callback ) {
        callback();
    }
};
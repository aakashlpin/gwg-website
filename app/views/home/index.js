var BaseView = require( '../base' );

module.exports = BaseView.extend( {
	className: 'site-wrapper',
    postRender: function () {
        //this.app will refer to req.rendrApp which needs to be set via some middleware first
//        var session = this.app.get('session');
//        console.log(session);
    }
} );
module.exports.id = 'home/index';
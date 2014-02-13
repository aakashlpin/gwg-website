var BaseView = require( '../base' ),
    $ = require( 'jquery' ),
    SignupModel = require( '../../models/signup' );

module.exports = BaseView.extend( {
    className: 'site-wrapper',
    ui: {
        'submitBtn': '#signup-form [type="submit"]',
        'inputBtn': '#signup-form [type="email"]'
    },
    events: {
        'submit #signup-form': 'actionOnSubmitForm'
    },
    actionOnSubmitForm: function (e) {
        e.preventDefault();
        var email = $.trim(this.$el.find('#email').val());
        //very basic email validation
        if ( !email.length ) return;
        if ((email.indexOf('@') <= 0) ||
            (email.indexOf('.') <= 0) ||
            (email.indexOf('@') > email.lastIndexOf('.'))) return;

        var signupModel = new SignupModel({email: email}, {app: this.app});
        signupModel.save({}, {
            error: function() {

            }, success: _.bind(function() {
                this.$el.find(this.ui.inputBtn)
                    .attr('disabled', 'disabled');

                this.$el.find(this.ui.submitBtn)
                    .toggleClass('btn-success btn-primary')
                    .html('You are in!')
                    .attr('disabled', 'disabled');

            }, this)
        });

    }
} );
module.exports.id = 'home/index';
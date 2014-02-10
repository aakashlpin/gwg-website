var BaseView = require( '../base' ),
	_ = require( 'underscore' ),
	$ = require( 'jquery' );

module.exports = BaseView.extend( {
	className: 'site-wrapper',
	events: {
		'click #triggerFacebookLogin': 'actionOnTriggerFacebookLogin',
		'keypress input': 'actionOnKeyPress',
		'change input': 'actionOnChangeInInput',
		'submit form': 'actionOnFormSubmit'
	},
	ui: {
		fbLoginContainer: '.fb-login-container',
		triggerFacebookLogin: '#triggerFacebookLogin',
		form: 'form',
		formName: '#name',
		formEmail: '#email',
		nextBtn: '#next'
	},
	postRender: function () {
		window.fbAsyncInit = _.bind( function () {
			FB.init( {
				appId: '424544477675893',
				status: true, // check login status
				cookie: true, // enable cookies to allow the server to access the session
				xfbml: true // parse XFBML
			} );

			FB.Event.subscribe( 'auth.authResponseChange', _.bind( function ( response ) {
				if ( response.status === 'connected' ) {
					this.postLogin();
				}
			}, this ) );
		}, this );

		// Load the SDK asynchronously
		( function ( d ) {
			var js, id = 'facebook-jssdk',
				ref = d.getElementsByTagName( 'script' )[ 0 ];
			if ( d.getElementById( id ) ) {
				return;
			}
			js = d.createElement( 'script' );
			js.id = id;
			js.async = true;
			js.src = '//connect.facebook.net/en_US/all.js';
			ref.parentNode.insertBefore( js, ref );
		}( document ) );

	},
	postLogin: function () {
		FB.api( '/me', _.bind( function ( response ) {
			var userData = {
				first_name: response.first_name,
				last_name: response.last_name,
				name: response.name,
				email: response.email,
				location: response.location.name,
				gender: response.gender,
				timezone: response.timezone
			};

			FB.api( '/me/picture?width=180&height=180', _.bind( function ( response ) {
				userData.image = response.data.url;
				$( this.ui.fbLoginContainer ).slideUp();
				this.autoFillForm( userData );
			}, this ) );

		}, this ) );
	},
	autoFillForm: function ( data ) {
		$( this.ui.formEmail ).val( data.email ).trigger( 'change' );
		$( this.ui.formName ).val( data.name ).trigger( 'change' );

	},
	actionOnTriggerFacebookLogin: function ( e ) {
		e.preventDefault();
		FB.getLoginStatus( _.bind( function ( response ) {
			if ( response.status === 'connected' ) {
				this.postLogin();

			} else {
				var _this = this;
				FB.login( function ( response ) {
					if ( response.authResponse ) {
						_this.postLogin();

					} else {
						console.log( 'Auth cancelled.' );
					}
				}, {
					scope: 'email'
				} );
			}
		}, this ) );
	},
	actionOnKeyPress: function ( e ) {
		this._toggleNextButtonVisibility();

	},
	actionOnChangeInInput: function ( e ) {
		this._toggleNextButtonVisibility();

	},
	_toggleNextButtonVisibility: function () {
		var isAllowNext = false;

		$( this.ui.form ).find( 'input' ).each( function () {
			isAllowNext = !! $.trim( $( this ).val() ).length;
		} );

		if ( isAllowNext ) {
			$( this.ui.nextBtn ).removeAttr( 'disabled' );
		} else {
			$( this.ui.nextBtn ).attr( 'disabled', 'disabled' );
		}

	},
	isValidEmail: function ( inputEmail ) {
		return true;
	},
	actionOnFormSubmit: function ( e ) {
		e.preventDefault();
		App.router.navigate( 'g/schedule', {
			trigger: true
		} );
	}
} );

module.exports.id = 'guru/index';
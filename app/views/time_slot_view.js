var BaseView = require( './base' ),
	$ = require( 'jquery' ),
	TimePicker = require( 'bootstrap.timepicker' ),
	moment = require( 'moment' );

module.exports = BaseView.extend( {
	events: {
		'change.bfhtimepicker': 'actionOnChangeTime',
		'click .time-slot-remove': 'actionOnRemoveTimeSlot'
	},
	postRender: function () {
		var timepicker = this.$el.find( 'div.bfh-timepicker' );
		var _this = this;
		timepicker.each( function () {
			var _timepicker = $( this );
			_timepicker.bfhtimepicker( {
				icon: '',
				time: _this.model.get( _timepicker.data( 'type' ) ),
				mode: '12h'
			} );
		} );

	},
	actionOnChangeTime: function ( e ) {
		var target = $( e.target ),
			targetType = target.data( 'type' ),
			targetValue = target.find( '.bfh-timepicker-toggle input' ).val();

		var modelChanges = {};
		modelChanges[ targetType ] = targetValue;
		modelChanges[ 'date_' + targetType ] = moment( targetValue, 'hh:mm A' );
		this.model.set( modelChanges );

	},
	actionOnRemoveTimeSlot: function ( e ) {
		e.preventDefault();
		this.model.destroy();
		this.remove();
	}

} );

module.exports.id = 'time_slot_view';
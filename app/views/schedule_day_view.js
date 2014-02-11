var BaseView = require( './base' ),
	BaseModel = require( '../models/base' ),
	BaseCollection = require( '../collections/base' ),
	moment = require( 'moment' );

module.exports = BaseView.extend( {
	className: 'day-slots-container',
	events: {
		'click .copyModeContainer a': 'actionOnChangeCopyFromDay',
		'click .addNewSlot': 'actionOnAddNewTimeSlot',
		'click .clearAllDaySlots': 'actionOnClearAllDaySlots'
	},
	ui: {
		daySlotsContainer: '.daySlotsContainer',
		copyModeContainer: '.copyModeContainer'
	},
	postInitialize: function () {
		this.subViews = {};
		this.modes = {
			COPY: 'copy',
			MANUAL: 'manual'
		};

        this.t_noSlotsTemplate = this.app.templateAdapter.getTemplate('schedule_day_no_slots');
        this.t_copyModeTemplate = this.app.templateAdapter.getTemplate('schedule_day_copy_mode');

	},
    preRender: function () {
        this.model.on('change', this.actionOnChangeInModel.bind(this));
//        this.model.get('slots').on('add remove', this.actionOnChangeInModel.bind(this));
    },
    actionOnChangeInModel: function (model) {
        this.trigger( 'update:model', model );

    },
	initSlot: function () {
		var startTime = '09:00 AM',
			endTime = '10:00 AM';

		this.$el.find(this.ui.daySlotsContainer).html( this._getTimeSlotView( startTime, endTime ).render().el );

	},
	actionOnClearAllDaySlots: function () {
		this.model.unset( 'slots' );
		this.model.set( {
			noSlots: true
		} );

		this._switchMode( this.modes.COPY );
		this.$el.find(this.ui.copyModeContainer).html( this.t_noSlotsTemplate() );
		this.trigger( 'schedule:day:slot', this.model );

	},
	actionOnChangeCopyFromDay: function ( e ) {
		e.preventDefault();
		this.selectedDayCode = $( e.target ).data( 'daycode' );
		this._manageSelectedDay();

	},
	startCopyMode: function ( modelsWithFilledSlots ) {
		this._switchMode( this.modes.COPY );
		this.$el.find(this.ui.copyModeContainer).html( this.t_copyModeTemplate( {
			days: modelsWithFilledSlots
		} ) );
		this._manageSelectedDay();

	},
	_manageSelectedDay: function () {
		//reset selections
		this.$el.find(this.ui.copyModeContainer).find( 'a' ).removeClass( 'selected' );
		//get first child
		var firstChild = this.$el.find(this.ui.copyModeContainer).find( 'li:first-child a' );
		//set selectedDayCode
		this.selectedDayCode = this.selectedDayCode || firstChild.data( 'daycode' );
		//attempt to get DOM
		var childInDOM = this.$el.find(this.ui.copyModeContainer).find( 'a[data-daycode="' + this.selectedDayCode + '"]' );
		//if no such elem found in DOM, set selectedDayCode to first child
		var elemToSelect = childInDOM;
		if ( !childInDOM.length ) {
			elemToSelect = firstChild;
			this.selectedDayCode = firstChild.data( 'daycode' );
		}
		//finally highlight the appropriate child
		elemToSelect.addClass( 'selected' );
		//mark the selectedDayCode in model
		this.model.set( {
			selectedDayCode: this.selectedDayCode
		} );
	},
	_getTimeSlotView: function ( startTime, endTime ) {
		var TimeSlotView = BaseView.getView( 'time_slot_view' );
		return this.subViews[ endTime ] = new TimeSlotView({
			model: this._addSlot( startTime, endTime ),
            app: this.app
        });

	},
	_addSlot: function ( startTime, endTime ) {
		if ( !( this.model.get( 'slots' ) instanceof BaseCollection ) || this.model.get( 'noSlots' ) ) {
			var slotsCollection = new BaseCollection(null, {app: this.app});
			slotsCollection.on( 'add remove', function ( model ) {
				if ( !this.model.get( 'slots' ).size() ) {
					this.actionOnClearAllDaySlots();
				}
                this.trigger( 'update:model', this.model );
				this.trigger( 'schedule:time:change', this.model, model );

			}, this );

			this.model.set( 'slots', slotsCollection );
			this.model.unset( 'noSlots' );
		}

		var slotToAdd = this._getModelForTimeSlot( startTime, endTime );
		this.model.get( 'slots' ).add( slotToAdd );
		return slotToAdd;

	},
	_getModelForTimeSlot: function ( startTime, endTime ) {
		return new BaseModel( {
			date_startTime: moment( startTime, 'hh:mm A' ),
			date_endTime: moment( endTime, 'hh:mm A' ),
			startTime: startTime,
			endTime: endTime
		}, {app: this.app} );

	},
	_switchMode: function ( mode ) {
		this.currentMode = mode;
		switch ( mode ) {
		case this.modes.COPY:
            this.$el.find(this.ui.daySlotsContainer).empty().hide();
            this.$el.find(this.ui.copyModeContainer).show();
			break;
		case this.modes.MANUAL:
            this.$el.find(this.ui.copyModeContainer).empty().hide();
            this.$el.find(this.ui.daySlotsContainer).show();
			break;
		}

		this.model.set( {
			currentMode: this.currentMode
		} );
	},
	actionOnAddNewTimeSlot: function ( e ) {
		e.preventDefault();
		var takenSlots = this.model.get( 'slots' );
		if ( !takenSlots || !takenSlots.size() ) {
			this._switchMode( this.modes.MANUAL );
			this.initSlot();
			return;
		}

		var minHour = takenSlots.max( function ( takenSlot ) {
			return takenSlot.get( 'date_endTime' ).hours();
		} );

		var startTime = minHour.get( 'endTime' ),
			endTime = minHour.get( 'date_endTime' ).add( 'hours', 1 ).format( 'hh:mm A' );

		//undo changes done to the original object
		minHour.get( 'date_endTime' ).subtract( 'hours', 1 );

        this.$el.find(this.ui.daySlotsContainer).append( this._getTimeSlotView( startTime, endTime ).render().el );

	}
} );

module.exports.id = 'schedule_day_view';
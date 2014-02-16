var BaseView = require( '../base' ),
    _ = require( 'underscore'),
    moment = require( 'moment' );

module.exports = BaseView.extend( {
    events: {
        'click #saveSchedule': 'actionOnSaveSchedule'
    },
    postRender: function () {
        //bind the events first
        this.listenTo(this.app, 'schedule:time:change', this.actionOnChangeInSlots);
        this.listenTo(this.app, 'update:model', this.updateModelFromChild);

        //TODO Hack because I don't know how to get childViews by name
        //removing the header and sidebar childViews from further processing
        this.childViews = _.filter(this.childViews, function (childView) {
            return !!childView.model;
        });

        //then create the first slot
        var firstDay = this.childViews[0];
        firstDay.initSlot();

    },
    updateModelFromChild: function (model) {
        this.collection.add(model, {merge: true});

    },

    actionOnToggleSlots: function (model) {
        //triggered when the noSlots property is changed
        this.actionOnChangeInSlots(model);

    },
    actionOnChangeInSlots: function (childModel) {
        //get all empty day models and notify them of model of days with filled slots
        var filteredCollection = this.collection.reject(function (model) {
            //do not track models with noSlots set to true
            if (model.get('noSlots')) return true;
            //only if current child has filled slots, exclude that from current processing
            if (childModel.get('slots') && childModel.get('slots').size()) {
                return model.get('day_code') === childModel.get('day_code');
            }

            //allow the element to be passed.
            return false;
        });

        _.each(filteredCollection, function (otherChildModel) {
            if (!otherChildModel.get('slots') || !otherChildModel.get('slots').size()) {
                //if other child model is empty
                var otherChildView = this._findByModel(otherChildModel);
                otherChildView.startCopyMode(this._daysHavingFilledSlots());
            }
        }, this);

    },
    _findByModel: function (model) {
        return _.find(this.childViews, function (childView) {
            return childView.model.get('day_code') === model.get('day_code');
        })
    },
    _daysHavingFilledSlots: function () {
        return this.collection.filter(function (model) {
            return model.get('slots') && model.get('slots').size();
        });

    },
    actionOnSaveSchedule: function (e) {
        e.preventDefault();
        //TODO sync
        console.log(this.collection.toJSON());
        this.app.router.redirectTo('/g/courses');

    }

} );

module.exports.id = 'guru/schedule';
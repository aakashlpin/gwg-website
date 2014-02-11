var BaseView = require( '../base' ),
    _ = require( 'underscore'),
    moment = require( 'moment' );

module.exports = BaseView.extend( {
    events: {
        'click #saveSchedule': 'actionOnSaveSchedule'
    },
    postRender: function () {
        var firstDay = this.childViews[0];
        firstDay.initSlot();

        _.each(this.childViews, function (childView) {
            this.listenTo(childView, 'schedule:time:change', this.actionOnChangeInSlots);
            this.listenTo(childView, 'schedule:day:slot', this.actionOnToggleSlots);
        }, this);

    },
    actionOnToggleSlots: function (model) {
        //triggered when the noSlots property is changed

    },
    actionOnChangeInSlots: function (childModel, timeModel) {
        //get all empty day models and notify them of model of days with filled slots
        var filteredCollection = this.collection.reject(function (model) {
            //do not track models with noSlots set to true
            if (model.get('noSlots')) return true;
            //only if current child has filled slots, exclude that from current processing
            if (childModel.get('slots') && childModel.get('slots').size()) {
                return model.get('dayCode') === childModel.get('dayCode');
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
            return childView.model.get('dayCode') === model.get('dayCode');
        })
    },
    _daysHavingFilledSlots: function () {
        return this.collection.filter(function (model) {
            return model.get('slots') && model.get('slots').size();
        });
    }
} );

module.exports.id = 'guru/schedule';
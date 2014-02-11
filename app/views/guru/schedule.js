var BaseView = require( '../base' ),
    _ = require( 'underscore'),
    moment = require( 'moment' );

module.exports = BaseView.extend( {
    events: {
        'click #saveSchedule': 'actionOnSaveSchedule'
    },
    postRender: function () {
        var firstDay = this.childViews[0];
        console.log(firstDay);
        firstDay.initSlot();

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
                var otherChildView = this.children.findByModel(otherChildModel);
                otherChildView.startCopyMode(this._daysHavingFilledSlots());
            }
        }, this);

    },
    _daysHavingFilledSlots: function () {
        return this.collection.filter(function (model) {
            return model.get('slots') && model.get('slots').size();
        });
    }
} );

module.exports.id = 'guru/schedule';
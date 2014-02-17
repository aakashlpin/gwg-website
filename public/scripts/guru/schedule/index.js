/*** @jsx React.DOM */

var TimeSlotComponent = React.createClass({
    componentDidMount: function() {
        var domNode = $(this.getDOMNode());
        var timepicker = domNode.find('div.bfh-timepicker');
        var _this = this;
        timepicker.each(function() {
            var _timepicker = $(this);
            _timepicker.bfhtimepicker({
                icon: '',
                time: _this.props.data[_timepicker.data('type')],
                mode: '12h'
            });
        });

    },
    removeTimeSlot: function() {
        this.props.onSlotRemove(this.props.dayCode, this.props.data);

    },
    render: function() {
        return (
            <div className="time-slot-container clearfix">
                <div className="item time-slot-unit">
                    <div className="bfh-timepicker" data-type="startTime"></div>
                </div>
                <div className="item time-slot-join">
                    <span className="schedule-text-middle">to</span>
                </div>
                <div className="item time-slot-unit">
                    <div className="bfh-timepicker" data-type="endTime"></div>
                </div>
                <div className="item time-slot-remove">
                    <button className="btn btn-link" onClick={this.removeTimeSlot}>
                        <i className="glyphicon glyphicon-remove"></i>
                    </button>
                </div>
            </div>
            );
    }
});

var DayComponent = React.createClass({
    addTimeSlot: function() {
        var minTimeSlotEndTime = _.max(this.props.data.slots, function(takenSlot) {
                return moment(takenSlot.endTime, 'hh:mm A').hours();

            })
            , startTime
            , endTime;

        if (_.isObject(minTimeSlotEndTime)) {
            startTime = minTimeSlotEndTime.endTime;
            endTime = moment(minTimeSlotEndTime.endTime, 'hh:mm A').add('hours', 1).format('hh:mm A');

        } else {
            startTime = '08:00 AM';
            endTime = '09:00 AM';
        }

        this.props.data.slots.push({
            startTime: startTime,
            endTime: endTime
        });

        this.props.data.noSlots = false;
        this.props.data.currentMode = 'manual';

        this.props.onDayChange(this.props.data.day_code, {
            slots: this.props.data.slots,
            noSlots: this.props.data.noSlots,
            currentMode: this.props.data.currentMode
        });

    },
    removeAllTimeSlots: function() {
        this.props.data.slots = [];
        this.props.data.noSlots = true;

        this.props.onDayChange(this.props.data.day_code, {
            slots: this.props.data.slots,
            noSlots: this.props.data.noSlots
        });

    },
    handleOnSlotRemove: function(dayCode, timeSlot) {
        var dayObject = this.props.data;

        dayObject.slots = _.reject(dayObject.slots, function(slot) {
            return ((slot.startTime === timeSlot.startTime)
                && (slot.endTime === timeSlot.endTime)
                );
        });

        if (!dayObject.slots.length) {
            dayObject.noSlots = true;
        }

        this.props.onDayChange(dayCode, dayObject);

    },
    getChild: function() {
        if (this.props.data.currentMode === 'copy') {
            return (
                <div className="copyModeContainer">
                    <div className="l-h-list">
                        <p className="item schedule-text-middle">Same as:  </p>
                        <ul className="item l-h-list guru-schedule-copy-links">
                        </ul>
                    </div>
                </div>
                );

        } else {
            if (!this.props.data.noSlots) {
                var dom = this.props.data.slots.map(function(slot) {
                    return (<TimeSlotComponent data={slot} key={slot.startTime} onSlotRemove={this.handleOnSlotRemove}/>)
                }, this);

                return (<div className="daySlotsContainer">{dom}</div>);

            } else {
                return (
                    <div className="copyModeContainer">
                        <p className="schedule-text-middle">No slots</p>
                    </div>
                    );
            }
        }
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-sm-2 text-left">
                    <p className="schedule-text-middle">{this.props.data.day_name}</p>
                </div>
                <div className="col-sm-7">
                {this.getChild()}
                </div>
                <div className="col-sm-3 text-right">
                    <a className="schedule-text-middle addNewSlot" title="Add New Slot"
                    onClick={this.addTimeSlot}>
                        <i className="glyphicon glyphicon-plus"></i>
                    </a>
                    <a className="schedule-text-middle clearAllDaySlots" title="Remove All Slots"
                    onClick={this.removeAllTimeSlots}>
                        <i className="glyphicon glyphicon-trash"></i>
                    </a>
                </div>
            </div>
            );
    }
});

var DaysList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount: function() {
        //make the call to reflect the user currently logged in
        $.ajax({
            url: '/api/user',
            dataType: 'json',
            success: function(data) {
                this.setState({data: data.schedule});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log('/api/user error ', status, err.toString());
            }.bind(this)
        })
    },
    componentDidMount: function() {

    },
    saveData: function() {
        console.log(this.state.data);

    },
    handleOnChange: function(dayCode, properties) {
        this.setState({'data': _.map(this.state.data, function(dayObject) {
            if (dayObject.day_code === dayCode) {
                for (var property in properties) {
                    if (properties.hasOwnProperty(property)) {
                        dayObject[property] = properties[property];
                    }
                }
            }
            return dayObject;})
        });
    },
    render: function() {
        var dayNodes = this.state.data.map(function(dayData) {
            return <DayComponent data={dayData} key={dayData._id} onDayChange={this.handleOnChange}/>
        }, this);

        return (
            <div>
            {dayNodes}
                <div className="clearfix mb-30">
                    <button className="btn btn-success pull-right" id="saveSchedule" onClick={this.saveData}>
                    Save and Proceed
                    </button>
                </div>
            </div>
            )
    }
});

React.renderComponent(
    <DaysList />,
    document.getElementById('scheduleCreator')
);
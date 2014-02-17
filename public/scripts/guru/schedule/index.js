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
        console.log('ought to remove it, bro! Later.');
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
    getInitialState: function() {
        return {
            takenSlots: this.props.data.slots,
            noSlots: this.props.data.noSlots,
            currentMode: this.props.data.currentMode
        };
    },
    addTimeSlot: function() {
        var minTimeSlotEndTime = _.max(this.state.takenSlots, function(takenSlot) {
            return takenSlot.date_endTime.hours();
        }), startTime, endTime;

        if (_.isObject(minTimeSlotEndTime)) {
            startTime = minTimeSlotEndTime.endTime;
            endTime = minTimeSlotEndTime.date_endTime.add('hours', 1).format('hh:mm A');
            //undo changes done to the original object
            minTimeSlotEndTime.date_endTime.subtract('hours', 1);

        } else {
            startTime = '08:00 AM';
            endTime = '09:00 AM';
        }

        this.state.takenSlots = this.state.takenSlots || [];

        this.state.takenSlots.push({
            date_startTime: moment(startTime, 'hh:mm A'),
            date_endTime: moment(endTime, 'hh:mm A'),
            startTime: startTime,
            endTime: endTime
        });

        this.setState({
            takenSlots: this.state.takenSlots,
            noSlots: false
        });

    },
    removeAllTimeSlots: function() {
        this.setState({
            takenSlots: [],
            noSlots: true
        });

    },
    getChild: function() {
        if (!this.state.noSlots) {
            return this.state.takenSlots.map(function(slot) {
                return (
                    <div className="daySlotsContainer">
                        <TimeSlotComponent data={slot} />
                    </div>);
            });
        } else {
            return (
                <div>
                    <p class="schedule-text-middle">No slots</p>
                </div>
                );
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
        //make the ajax call
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
    render: function() {
        var dayNodes = this.state.data.map(function(dayData) {
            return <DayComponent data={dayData} key={dayData._id} />
        });

        return (
            <div>{dayNodes}</div>
            )
    }
});

React.renderComponent(
    <DaysList />,
    document.getElementById('scheduleCreator')
);

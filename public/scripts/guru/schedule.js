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
        this.props.data.currentMode = 'manual';

        this.props.onDayChange(this.props.data.day_code, {
            slots: this.props.data.slots,
            noSlots: this.props.data.noSlots,
            currentMode: this.props.data.currentMode
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
    handleClickOnCopyModeChange: function(e) {
        var target = $(e.target);
        var dayCode = target.data('day_code');
        this.props.onDayChange(this.props.data.day_code, {
            selectedDayCode: dayCode
        });

    },
    getChild: function() {
        if (this.props.data.currentMode === 'copy') {
            if (!this.props.data.noSlots) {
                var copyModeDOM = this.props.copyModeData.map(function(copyModeDataItem) {
                    return (
                        <li className="item" key={copyModeDataItem.day_code}>
                            <a
                            className={copyModeDataItem.day_code === this.props.data.selectedDayCode ? 'selected': ''}
                            data-day_code={copyModeDataItem.day_code}
                            onClick={this.handleClickOnCopyModeChange}
                            >
                            {copyModeDataItem.day_code}
                            </a>
                        </li>
                        )
                }, this);

                return (
                    <div className="copyModeContainer">
                        <div className="l-h-list">
                            <p className="item schedule-text-middle">Same as:  </p>
                            <ul className="item l-h-list guru-schedule-copy-links">
                        {copyModeDOM}
                            </ul>
                        </div>
                    </div>
                    );
            } else {
                return (
                    <div className="copyModeContainer">
                        <p className="schedule-text-middle">No slots</p>
                    </div>
                    );

            }

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
            <div className="day-slots-container">
                <div className="row">
                    <div className="col-sm-2 text-left">
                        <p className="text-bold schedule-text-middle">{this.props.data.day_name}</p>
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
            </div>
            );
    }
});

var DaysList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/schedule', function(data) {
            this.setState({data: data.schedule});
        }.bind(this));

    },
    saveData: function() {
        $.post('/api/guru/schedule', {schedule: this.state.data}, function(res) {
            $(this.getDOMNode()).find('#saveSchedule')
                .html('Saved')
                .toggleClass('btn-success btn-primary')
            ;

        }.bind(this));

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

            if (dayObject.currentMode === 'copy') {
                var copyModeData = this.getCopyModeData(dayObject);
                if (copyModeData.length) {
                    //if the selectedDayCode is not found in the list of copy mode items
                    if (!_.isObject(_.find(copyModeData, function(copyModeObject) {
                        return dayObject.selectedDayCode === copyModeObject.day_code;
                    }, this))) {
                        //then set the first item in the list of available copy modes as selected
                        dayObject.selectedDayCode = copyModeData[0].day_code;
                    }
                    dayObject.noSlots = false;

                } else {
                    var atleastOneDayWithSlotsExists = _.find(this.state.data, function(dataObject) {
                        return dataObject.slots.length;
                    });

                    if (!atleastOneDayWithSlotsExists) {
                        dayObject.noSlots = true;
                    }
                }
            }

            return dayObject}, this)
        });
    },
    getCopyModeData: function(dayObject) {
        if (dayObject.currentMode !== 'copy') {
            //for the sake of returning a common data structure
            return [];
        }

        return this.state.data.filter(function(dataDayObject) {
            return ((!dataDayObject.noSlots)    //should not be in noSlots mode
                && (dataDayObject.day_code !== dayObject.day_code)  //exclude the current dayObject
                && (dataDayObject.currentMode !== 'copy')   //exclude the copy mode guys
                );
        });

    },
    render: function() {
        var dayNodes = this.state.data.map(function(dayData) {
            var copyModeData = this.getCopyModeData(dayData);
            return (
                <DayComponent data={dayData} key={dayData._id} onDayChange={this.handleOnChange}
                copyModeData={copyModeData}
                />
                );
        }, this);

        return (
            <div>
            {dayNodes}
                <div className="text-center mb-30">
                    <button className="btn btn-success" id="saveSchedule" onClick={this.saveData}>
                    Save
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
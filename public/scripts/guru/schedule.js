/*** @jsx React.DOM */
/***
 *
 *
 * Loading Component
 */

var Loading = React.createClass({
    render: function() {
        return (
            <div className="loader">
                <div className="loader-inner">
                    <img src="/images/loader.gif" alt="Just a moment.." />
                </div>
            </div>
            )
    }
});

var TimeSlotComponent = React.createClass({
    trickleDown: function(startTime, endTime) {
        this.props.data.startTime = startTime;
        this.props.data.endTime = endTime;
        this.props.onSlotChange(this.props.dayCode, this.props.data);

    },
    componentDidMount: function() {
        var domNode = $(this.getDOMNode());
        var startTimeInputId = '#' + this.props.data.key + '_0',
            endTimeInputId  = '#' + this.props.data.key + '_1';

        var from_$input = $(startTimeInputId).pickatime({interval: 15}),
            from_picker = from_$input.pickatime('picker');

        var to_$input = $(endTimeInputId).pickatime({
                interval: 15,
                formatLabel: function( timeObject ) {
                    var minObject = this.get( 'min' ),
                        hours = timeObject.hour - minObject.hour,
                        mins = ( timeObject.mins - minObject.mins ) / 60,
                        pluralize = function( number, word ) {
                            return number + ' ' + ( number === 1 ? word : word + 's' )
                        };
                    return '<b>h</b>:i <!i>a</!i> <sm!all>(' + pluralize( hours + mins, '!hour' ) + ')</sm!all>'
                }
            }),
            to_picker = to_$input.pickatime('picker');

        // Check if there’s a “from” or “to” time to start with.
        if ( from_picker.get('value') ) {
            to_picker.set('min', from_picker.get('select'));
        }

        // When something is selected, update the “from” and “to” limits.
        from_picker.on('set', function(event) {
            if ( event.select ) {
                to_picker.set('min', from_picker.get('select'));
                to_picker.set('select', from_picker.get('select').pick + 60);
                this.trickleDown(from_picker.get('value'), to_picker.get('value'));
            }
        }.bind(this));

        to_picker.on('set', function(event) {
            if ( event.select ) {
                from_picker.set('max', to_picker.get('select'));
                this.trickleDown(from_picker.get('value'), to_picker.get('value'));
            }
        }.bind(this));

    },
    removeTimeSlot: function() {
        this.props.onSlotRemove(this.props.dayCode, this.props.data);

    },
    render: function() {
        return (
            <div className="time-slot-container clearfix">
                <div className="item time-slot-unit">
                    <input
                    className="form-control gwg-timepicker"
                    id={this.props.data.key + '_0'}
                    name={this.props.data.key + '_0'}
                    value={this.props.data.startTime}
                    data-type="startTime" />
                </div>
                <div className="item time-slot-join">
                    <span className="schedule-text-middle">to</span>
                </div>
                <div className="item time-slot-unit">
                    <input
                    className="form-control gwg-timepicker"
                    id={this.props.data.key + '_1'}
                    name={this.props.data.key + '_1'}
                    value={this.props.data.endTime}
                    data-type="endTime" />
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
            endTime: endTime,
            key: this.props.data.day_code + '_' + (++this.props.data.slotIndex)
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
            return (slot.key === timeSlot.key)
        });

        if (!dayObject.slots.length) {
            dayObject.noSlots = true;
        }

        this.props.onDayChange(dayCode, dayObject);

    },
    handleOnSlotChange: function(dayCode, data) {
        var dayObject = this.props.data;

        dayObject.slots = _.map(dayObject.slots, function(slot) {
            if (slot.key === data.key) {
                slot = data;
            }

            return slot;
        });

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
                            <p className="item schedule-text-middle text-light">Same as:  </p>
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
                    return (
                        <TimeSlotComponent data={slot} dayCode={this.props.data.day_code}
                        onSlotChange={this.handleOnSlotChange}
                        onSlotRemove={this.handleOnSlotRemove}/>
                        )
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
    getRowActionItemIcon: function() {
        if (this.props.data.currentMode === 'copy') {
            return (
                <i className="fa fa-clock-o"></i>
                )
        } else if (this.props.data.noSlots) {
            return (
                <i className="fa fa-edit"></i>
                )
        }
        return (
            <i className="glyphicon glyphicon-plus"></i>
            )
    },
    getRowActionItemIconTitle: function() {
        if (this.props.data.currentMode === 'copy') {
            return "Create time slots";
        } else if (this.props.data.noSlots) {
            return "Create slots";
        }
        return "Add new slot";

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
                        <a className="schedule-text-middle addNewSlot" title={this.getRowActionItemIconTitle()}
                        onClick={this.addTimeSlot}>
                        {this.getRowActionItemIcon()}
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
        return {
            data: [],
            fetched: false,
            isDirty: true
        };
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/schedule', function(data) {
            //map each slot with a key
            //this enables trickling down the key for updating/removing
            _.each(data.schedule, function(scheduleItem) {
                _.each(scheduleItem.slots, function(slotItem, index) {
                    slotItem.key = scheduleItem.day_code + '_' + index;
                }, this);

                scheduleItem.slotIndex = scheduleItem.slots.length;
            }, this);

            this.setState({
                data: data.schedule,
                fetched: true
            });
        }.bind(this));

    },
    saveData: function() {
        $.post('/api/guru/schedule', {schedule: this.state.data}, function(res) {
            this.setState({
                isDirty: false
            });

        }.bind(this));

    },
    handleOnChange: function(dayCode, properties) {
        this.setState({
            isDirty: true,
            data: _.map(this.state.data, function(dayObject) {
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
    getSubmitButton: function() {
        if (this.state.isDirty) {
            return (
                <button className="btn btn-success" id="saveSchedule" onClick={this.saveData}>
                Save
                </button>
                )
        }
        return (
            <button className="btn btn-primary">
            Saved
            </button>
            )

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

        var getChildDOM = function() {
            if (this.state.fetched) {
                return (
                    <div>
                    {dayNodes}
                        <div className="day-slots-container">
                            <div className="row">
                                <div className="col-sm-7 col-sm-offset-2">
                                {this.getSubmitButton.call(this)}
                                </div>
                            </div>
                        </div>
                    </div>
                    );
            } else {
                return (
                    <div className="has-min-height">
                        <Loading />
                    </div>
                    );
            }
        }.bind(this);

        return (
            <div className="has-min-height">
                <h3>Manage Schedule</h3>
                <p className="text-light">
                People will make reservations against these timings.
                </p>
                <p className="text-light gwg-callout gwg-callout-info">
                We have created a sample schedule for you.
                Change it to reflect your availability.
                </p>
                <p className="text-light gwg-callout gwg-callout-warning">
                When we are close to launch, we'll let you fine tune schedule for each date.
                </p>
                {getChildDOM()}
            </div>
            )
    }
});

React.renderComponent(
    <DaysList />,
    document.getElementById('scheduleCreator')
);
/*** @jsx React.DOM */
/***
 *
 *
 * Loading Component
 */

var Loading = React.createClass({displayName: 'Loading',
    render: function() {
        return (
            React.DOM.div( {className:"loader"}, 
                React.DOM.div( {className:"loader-inner"}, 
                    React.DOM.img( {src:"/images/loader.gif", alt:"Just a moment.."} )
                )
            )
            )
    }
});

var UiWidgetMixin = {
    getSubmitButton: function() {
        if (this.state.isDirty) {
            return (
                React.DOM.button( {className:"btn btn-success", id:"saveSchedule", onClick:this.saveData}, 
                " Save "
                )
                )
        }
        if (this.state.saving) {
            return (
                React.DOM.button( {className:"btn btn-success btn-loading"}, 
                " Saving.. "
                )
                )
        }
        return (
            React.DOM.button( {className:"btn btn-primary"}, 
            " Saved "
            )
            )

    },
    changeUIMode: function() {
        this.props.actionOnToggleUIMode();
    },
    initializeAutoSave: function() {
        //Autosave/ autosync every 2 sec
        setInterval(function() {
            var mostRecentChangeAt = moment(this.state.mostRecentChangeAt),
                now = moment(),
                diff = now.diff(mostRecentChangeAt)
                ;

            if (diff > 2000 && this.state.isDirty) {
                this.saveData();
            }

        }.bind(this), 1000);

    }

};

var TimeSlotComponent = React.createClass({displayName: 'TimeSlotComponent',
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
//                from_picker.set('max', to_picker.get('select'));
                this.trickleDown(from_picker.get('value'), to_picker.get('value'));
            }
        }.bind(this));

    },
    removeTimeSlot: function() {
        this.props.onSlotRemove(this.props.dayCode, this.props.data);

    },
    render: function() {
        return (
            React.DOM.div( {className:"time-slot-container clearfix"}, 
                React.DOM.div( {className:"item time-slot-unit"}, 
                    React.DOM.input(
                    {className:"form-control gwg-timepicker",
                    id:this.props.data.key + '_0',
                    name:this.props.data.key + '_0',
                    value:this.props.data.startTime,
                    'data-type':"startTime"} )
                ),
                React.DOM.div( {className:"item time-slot-join"}, 
                    React.DOM.span( {className:"schedule-text-middle"}, "to")
                ),
                React.DOM.div( {className:"item time-slot-unit"}, 
                    React.DOM.input(
                    {className:"form-control gwg-timepicker",
                    id:this.props.data.key + '_1',
                    name:this.props.data.key + '_1',
                    value:this.props.data.endTime,
                    'data-type':"endTime"} )
                ),
                React.DOM.div( {className:"item time-slot-remove"}, 
                    React.DOM.button( {className:"btn btn-link", onClick:this.removeTimeSlot}, 
                        React.DOM.i( {className:"glyphicon glyphicon-remove"})
                    )
                )
            )
            );
    }
});

var DayComponent = React.createClass({displayName: 'DayComponent',
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
                        React.DOM.li( {className:"item", key:copyModeDataItem.day_code}, 
                            React.DOM.a(
                            {className:copyModeDataItem.day_code === this.props.data.selectedDayCode ? 'selected': '',
                            'data-day_code':copyModeDataItem.day_code,
                            onClick:this.handleClickOnCopyModeChange}
                            , 
                            copyModeDataItem.day_code
                            )
                        )
                        )
                }, this);

                return (
                    React.DOM.div( {className:"copyModeContainer"}, 
                        React.DOM.div( {className:"l-h-list"}, 
                            React.DOM.p( {className:"item schedule-text-middle text-light"}, "Same as: "  ),
                            React.DOM.ul( {className:"item l-h-list guru-schedule-copy-links"}, 
                        copyModeDOM
                            )
                        )
                    )
                    );
            } else {
                return (
                    React.DOM.div( {className:"copyModeContainer"}, 
                        React.DOM.p( {className:"schedule-text-middle"}, "No slots")
                    )
                    );

            }

        } else {
            if (!this.props.data.noSlots) {
                var dom = this.props.data.slots.map(function(slot) {
                    return (
                        TimeSlotComponent( {data:slot, dayCode:this.props.data.day_code,
                        onSlotChange:this.handleOnSlotChange,
                        onSlotRemove:this.handleOnSlotRemove})
                        )
                }, this);

                return (React.DOM.div( {className:"daySlotsContainer"}, dom));

            } else {
                return (
                    React.DOM.div( {className:"copyModeContainer"}, 
                        React.DOM.p( {className:"schedule-text-middle"}, "No slots")
                    )
                    );
            }
        }
    },
    getRowActionItemIcon: function() {
        if (this.props.data.currentMode === 'copy') {
            return (
                React.DOM.i( {className:"fa fa-clock-o"})
                )
        } else if (this.props.data.noSlots) {
            return (
                React.DOM.i( {className:"fa fa-edit"})
                )
        }
        return (
            React.DOM.i( {className:"glyphicon glyphicon-plus"})
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
            React.DOM.div( {className:"day-slots-container"}, 
                React.DOM.div( {className:"row"}, 
                    React.DOM.div( {className:"col-sm-2 text-left"}, 
                        React.DOM.p( {className:"text-bold schedule-text-middle"}, this.props.data.day_name)
                    ),
                    React.DOM.div( {className:"col-sm-7"}, 
                    this.getChild()
                    ),
                    React.DOM.div( {className:"col-sm-3 text-right"}, 
                        React.DOM.a( {className:"schedule-text-middle addNewSlot", title:this.getRowActionItemIconTitle(),
                        onClick:this.addTimeSlot}, 
                        this.getRowActionItemIcon()
                        ),
                        React.DOM.a( {className:"schedule-text-middle clearAllDaySlots", title:"Remove All Slots",
                        onClick:this.removeAllTimeSlots}, 
                            React.DOM.i( {className:"glyphicon glyphicon-trash"})
                        )
                    )
                )
            )
            );
    }
});

var WeeklyWidget = React.createClass({displayName: 'WeeklyWidget',
    mixins: [UiWidgetMixin],
    getInitialState: function() {
        return {
            data: [],
            fetched: false,
            isDirty: false,
            saving: false,
            mostRecentChangeAt: new Date(),
            intervalNumber: 0
        }
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
    componentDidMount: function() {
        this.initializeAutoSave();

    },
    saveData: function() {
        this.setState({
            isDirty: false,
            saving: true
        });

        $.post('/api/guru/schedule', {schedule: this.state.data}, function(res) {
            //emulate some loading ;)
            setTimeout(function(){
                this.setState({
                    saving: false
                });

            }.bind(this), 500);

        }.bind(this));

        mixpanel.track('Schedule modified and saved');
    },
    handleOnChange: function(dayCode, properties) {
        this.setState({
            mostRecentChangeAt: new Date(),
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

        mixpanel.track('Schedule modified');
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
    handleRemoveAllSlots: function() {
        //unused right now as it's very destructive
        //to use it just put an <a> and call this method onClick
        if (confirm('Are you sure you want to remove all slots?')) {
            var dataWithRemovedSlots = this.state.data.map(function(dayData) {
                dayData.slots = [];
                dayData.noSlots = true;
                dayData.currentMode = 'manual';

                return dayData;
            });

            this.setState({
                data: dataWithRemovedSlots,
                isDirty: true
            });
        }
    },
    render: function() {
        //bring up the week mode for editing
        var dayNodes = this.state.data.map(function(dayData) {
            var copyModeData = this.getCopyModeData(dayData);
            return (
                DayComponent( {data:dayData, key:dayData._id, onDayChange:this.handleOnChange,
                copyModeData:copyModeData}
                )
                );
        }, this);

        if (!this.state.fetched) {
            return (
                React.DOM.div( {className:"has-min-height"}, 
                    Loading(null )
                )
                )
        }

        return (
            React.DOM.div(null, 
                React.DOM.div( {className:"day-slots-container"}, 
                    React.DOM.div( {className:"row"}, 
                        React.DOM.div( {className:"clearfix"}, 
                            React.DOM.div( {className:"pull-right"}, 
                                React.DOM.button( {className:"btn btn-link", onClick:this.changeUIMode}, 
                                " Edit on Calendar "
                                ),
                                this.getSubmitButton.call(this)
                            )
                        )
                    )
                ),
                dayNodes
            )
        );
    }
});

var CalendarWidget = React.createClass({displayName: 'CalendarWidget',
    mixins: [UiWidgetMixin],
    getDefaultProps: function() {
        return {
            currentStateStack: {}  //will represent new/ changed items from the weekly schedule in this calendar
        }
    },
    getInitialState: function() {
        return {
            isDirty: false,
            saving: false,
            fetched: false,
            mostRecentChangeAt: new Date()
        }

    },
    componentWillMount: function() {
        this.setState({
            fetched: true
        });

    },
    _updateCalendarChanges: function(id, object) {
        this.props.currentStateStack[id] = object;
        this.setState({
            isDirty: true,
            mostRecentChangeAt: new Date()
        });
    },
    _getKeyForPayLoad: function(momentObj) {
        var newMoment = moment(momentObj);
        newMoment.set('hour', 0);
        newMoment.set('minute', 0);
        newMoment.set('second', 0);
        newMoment.set('millisecond', 0);
        return newMoment.toDate();

    },
    saveData: function() {
        this.setState({
            isDirty: false,
            saving: true
        });

        var modifiedObject = this.props.currentStateStack;
        var oldTimeStamps = _.keys(modifiedObject);
        var payload = {};
        _.each(oldTimeStamps, function(oldTimeStamp) {
            var momentOfTs = moment(oldTimeStamp, 'X'),
                momentOfTsKey = this._getKeyForPayLoad(momentOfTs),
                shouldEnterRemovedSlot = true;

            payload[momentOfTsKey] = payload[momentOfTsKey] || {
                added_slots: [],
                removed_slots: []
            };

            var modifiedEventObject = modifiedObject[oldTimeStamp];
            if (!modifiedEventObject) {
                //the slot has been removed

            } else if (moment(oldTimeStamp, 'X').date() === moment(modifiedEventObject.start).date()) {
                //the slot has been modified or was newly created
                if (moment(oldTimeStamp, 'X').format('hh:mm A') === moment(modifiedEventObject.start).format('hh:mm A')) {
                    //its a modified slot
                    shouldEnterRemovedSlot = false;
                }

                payload[momentOfTsKey].added_slots.push({
                    startTime: moment(modifiedEventObject.start).format('hh:mm A'),
                    endTime: moment(modifiedEventObject.end).format('hh:mm A')
                });

            } else {
                //the slot has been removed from one day and put in another day
                var momentOfNewDate = moment(modifiedEventObject.start),
                    momentOfNewDateKey = this._getKeyForPayLoad(momentOfNewDate);

                payload[momentOfNewDateKey] = payload[momentOfNewDateKey] || {
                    added_slots: [],
                    removed_slots: []
                };

                payload[momentOfNewDateKey].added_slots.push({
                    startTime: moment(modifiedEventObject.start).format('hh:mm A'),
                    endTime: moment(modifiedEventObject.end).format('hh:mm A')
                })

            }

            if (shouldEnterRemovedSlot) {
                payload[momentOfTsKey].removed_slots.push({
                    startTime: momentOfTs.format('hh:mm A')
                });
            }

        }, this);

        //format the payload to be an array of objects
        var formattedPayload = _.map(_.keys(payload), function(payloadDate) {
            return {
                date: payloadDate,
                added_slots: payload[payloadDate].added_slots,
                removed_slots: payload[payloadDate].removed_slots
            }
        }, this);

        $.post('/api/guru/schedule', { calendar_schedule: formattedPayload }, function(res) {
            //emulate some loading ;)
            setTimeout(function(){
                this.setState({
                    saving: false
                });

            }.bind(this), 500);

        }.bind(this));

    },
    componentDidMount: function() {
        this.initializeAutoSave();

        var currentMousePos = {
            x: -1,
            y: -1
        };

        jQuery(document).on("mousemove", function (event) {
            currentMousePos.x = event.pageX;
            currentMousePos.y = event.pageY;
        });

        function isEventOverTrashCan() {
            var trashEl = jQuery('#calendarTrash');

            var ofs = trashEl.offset();

            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);

            return (currentMousePos.x >= x1 && currentMousePos.x <= x2 &&
                currentMousePos.y >= y1 && currentMousePos.y <= y2);
        }

        var calendar = $(this.getDOMNode()).find('#calendarEditorContainer').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay'
            },
            aspectRatio: 2,
            defaultView : 'agendaWeek',
            editable: true,
            events: {
                url: '/api/public/schedule',
                type: 'GET',
                data: { username: this.props.user.username }
            },
            selectable: true,
            selectHelper: true,
            slotEventOverlap: false,
            dragRevertDuration: 0,
            eventRender: function(event) {
                //prevent modification to reserved slots
                if (event.title.toLowerCase() == 'reserved') {
                    event.editable = false;
                }
            },
            select: function(start, end, allDay) {
                if (moment(start).isBefore(moment())) {
                    noty({
                        layout: 'topCenter',
                        text: "Time travelling in the past?",
                        timeout: 2500,
                        type: 'warning',
                        killer: true
                    });

                } else {
//                var title = prompt('Slot Title:', 'Available');
                    var title = 'Available';
                    if (title) {
                        var eventId = moment(start).unix();
                        this._updateCalendarChanges(eventId, {
                            title: title,
                            start: start,
                            end: end
                        });

                        calendar.fullCalendar('renderEvent', {
                                id: eventId,
                                title: title,
                                start: start,
                                end: end,
                                allDay: false
                            },
                            true // make the event "stick"
                        );
                    }

                }
                calendar.fullCalendar('unselect');

            }.bind(this),
            eventMouseover: function (event, jsEvent) {
                $(this).mousemove(function (e) {
                    var trashEl = jQuery('#calendarTrash');
                    if (isEventOverTrashCan()) {
                        if (!trashEl.hasClass("to-trash")) {
                            trashEl.addClass("to-trash");
                        }
                    } else {
                        if (trashEl.hasClass("to-trash")) {
                            trashEl.removeClass("to-trash");
                        }

                    }
                });
            },
            eventDragStop: function (event, jsEvent, ui, view) {
                if (isEventOverTrashCan()) {
                    this._updateCalendarChanges(event.id, null);
                    calendar.fullCalendar('removeEvents', event.id);

                    var trashEl = jQuery('#calendarTrash');
                    if (trashEl.hasClass("to-trash")) {
                        trashEl.removeClass("to-trash");
                    }
                }
            }.bind(this),
            eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc) {
                this._updateCalendarChanges(event.id, {
                    title: event.title,
                    start: event.start,
                    end: event.end
                });

            }.bind(this),
            eventResize: function(event, dayDelta, minuteDelta, revertFunc) {
                this._updateCalendarChanges(event.id, {
                    title: event.title,
                    start: event.start,
                    end: event.end
                });

            }.bind(this)

        });

        $(this.getDOMNode()).find('#calendarEditorContainer')
            .find('.fc-header-left')
            .append('<div id="calendarTrash" class="calendar-trash"><i class="fa fa-trash-o"></i></div>');

    },
    render: function() {
        if (!this.state.fetched) {
            return (
                React.DOM.div( {className:"has-min-height"}, 
                    Loading(null )
                )
                )
        }

        return (
            React.DOM.div(null, 
                React.DOM.div( {className:"day-slots-container"}, 
                    React.DOM.div( {className:"row"}, 
                        React.DOM.div( {className:"clearfix"}, 
                            React.DOM.div( {className:"pull-right"}, 
                                React.DOM.button( {className:"btn btn-link", onClick:this.changeUIMode}, 
                                " Edit Weekly Schedule "
                                ),
                                this.getSubmitButton.call(this)
                            )
                        )
                    )
                ),
                React.DOM.div( {id:"calendarEditorContainer"})
            )
            );

    }
});

var DaysList = React.createClass({displayName: 'DaysList',
    getInitialState: function() {
        return {
            isCalendarMode: true,
            isUserFetched: false,
            user: {}
        };
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/user', function(user) {
            //TODO mark it as an error and notify
            if (!user) return;

            this.setState({
                isUserFetched: true,
                user: user
            });

            mixpanel.identify(user.email);
            mixpanel.people.set({
                "$email": user.email,
                "$name": user.name,
                "$last_login": new Date()
            });

            mixpanel.track('Visited Schedule page');

        }.bind(this));
    },
    handleActionOnToggleUIMode: function(isCalendarMode) {
        this.setState({
            isCalendarMode: isCalendarMode
        });

    },
    getModeUI: function() {
        if (this.state.isCalendarMode) {
            //bring up the calendar widget for editing
            return (
                CalendarWidget(
                {user:this.state.user,
                actionOnToggleUIMode:this.handleActionOnToggleUIMode.bind(this, false)}
                )
            );

        }

        return (
            WeeklyWidget(
            {user:this.state.user,
            actionOnToggleUIMode:this.handleActionOnToggleUIMode.bind(this, true)}
            )
        );
    },
    ensureUserBeforeUI: function() {
        if (this.state.isUserFetched) {
            return this.getModeUI();
        }

        return (
            React.DOM.div(null)
        );

    },
    render: function() {
        return (
            React.DOM.div( {className:"has-min-height"}, 
                React.DOM.h3(null, "Manage Schedule"),
                React.DOM.p( {className:"text-light"}, 
                " People will make reservations against these timings. "
                ),
                React.DOM.p( {className:"text-light gwg-callout gwg-callout-info"}, 
                " Maintain the schedule below to reflect your availability. "
                ),
                this.ensureUserBeforeUI()
            )
        );
    }
});

React.renderComponent(
    DaysList(null ),
    document.getElementById('scheduleCreator')
);
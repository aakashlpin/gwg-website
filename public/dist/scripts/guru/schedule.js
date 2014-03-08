var Loading=React.createClass({displayName:"Loading",render:function(){return React.DOM.div({className:"loader"},React.DOM.div({className:"loader-inner"},React.DOM.img({src:"/images/loader.gif",alt:"Just a moment.."})))}}),TimeSlotComponent=React.createClass({displayName:"TimeSlotComponent",trickleDown:function(a,b){this.props.data.startTime=a,this.props.data.endTime=b,this.props.onSlotChange(this.props.dayCode,this.props.data)},componentDidMount:function(){var a=($(this.getDOMNode()),"#"+this.props.data.key+"_0"),b="#"+this.props.data.key+"_1",c=$(a).pickatime({interval:15}),d=c.pickatime("picker"),e=$(b).pickatime({interval:15,formatLabel:function(a){var b=this.get("min"),c=a.hour-b.hour,d=(a.mins-b.mins)/60,e=function(a,b){return a+" "+(1===a?b:b+"s")};return"<b>h</b>:i <!i>a</!i> <sm!all>("+e(c+d,"!hour")+")</sm!all>"}}),f=e.pickatime("picker");d.get("value")&&f.set("min",d.get("select")),d.on("set",function(a){a.select&&(f.set("min",d.get("select")),f.set("select",d.get("select").pick+60),this.trickleDown(d.get("value"),f.get("value")))}.bind(this)),f.on("set",function(a){a.select&&this.trickleDown(d.get("value"),f.get("value"))}.bind(this))},removeTimeSlot:function(){this.props.onSlotRemove(this.props.dayCode,this.props.data)},render:function(){return React.DOM.div({className:"time-slot-container clearfix"},React.DOM.div({className:"item time-slot-unit"},React.DOM.input({className:"form-control gwg-timepicker",id:this.props.data.key+"_0",name:this.props.data.key+"_0",value:this.props.data.startTime,"data-type":"startTime"})),React.DOM.div({className:"item time-slot-join"},React.DOM.span({className:"schedule-text-middle"},"to")),React.DOM.div({className:"item time-slot-unit"},React.DOM.input({className:"form-control gwg-timepicker",id:this.props.data.key+"_1",name:this.props.data.key+"_1",value:this.props.data.endTime,"data-type":"endTime"})),React.DOM.div({className:"item time-slot-remove"},React.DOM.button({className:"btn btn-link",onClick:this.removeTimeSlot},React.DOM.i({className:"glyphicon glyphicon-remove"}))))}}),DayComponent=React.createClass({displayName:"DayComponent",addTimeSlot:function(){var a,b,c=_.max(this.props.data.slots,function(a){return moment(a.endTime,"hh:mm A").hours()});_.isObject(c)?(a=c.endTime,b=moment(c.endTime,"hh:mm A").add("hours",1).format("hh:mm A")):(a="08:00 AM",b="09:00 AM"),this.props.data.slots.push({startTime:a,endTime:b,key:this.props.data.day_code+"_"+ ++this.props.data.slotIndex}),this.props.data.noSlots=!1,this.props.data.currentMode="manual",this.props.onDayChange(this.props.data.day_code,{slots:this.props.data.slots,noSlots:this.props.data.noSlots,currentMode:this.props.data.currentMode})},removeAllTimeSlots:function(){this.props.data.slots=[],this.props.data.noSlots=!0,this.props.data.currentMode="manual",this.props.onDayChange(this.props.data.day_code,{slots:this.props.data.slots,noSlots:this.props.data.noSlots,currentMode:this.props.data.currentMode})},handleOnSlotRemove:function(a,b){var c=this.props.data;c.slots=_.reject(c.slots,function(a){return a.key===b.key}),c.slots.length||(c.noSlots=!0),this.props.onDayChange(a,c)},handleOnSlotChange:function(a,b){var c=this.props.data;c.slots=_.map(c.slots,function(a){return a.key===b.key&&(a=b),a}),this.props.onDayChange(a,c)},handleClickOnCopyModeChange:function(a){var b=$(a.target),c=b.data("day_code");this.props.onDayChange(this.props.data.day_code,{selectedDayCode:c})},getChild:function(){if("copy"===this.props.data.currentMode){if(this.props.data.noSlots)return React.DOM.div({className:"copyModeContainer"},React.DOM.p({className:"schedule-text-middle"},"No slots"));var a=this.props.copyModeData.map(function(a){return React.DOM.li({className:"item",key:a.day_code},React.DOM.a({className:a.day_code===this.props.data.selectedDayCode?"selected":"","data-day_code":a.day_code,onClick:this.handleClickOnCopyModeChange},a.day_code))},this);return React.DOM.div({className:"copyModeContainer"},React.DOM.div({className:"l-h-list"},React.DOM.p({className:"item schedule-text-middle text-light"},"Same as: "),React.DOM.ul({className:"item l-h-list guru-schedule-copy-links"},a)))}if(this.props.data.noSlots)return React.DOM.div({className:"copyModeContainer"},React.DOM.p({className:"schedule-text-middle"},"No slots"));var b=this.props.data.slots.map(function(a){return TimeSlotComponent({data:a,dayCode:this.props.data.day_code,onSlotChange:this.handleOnSlotChange,onSlotRemove:this.handleOnSlotRemove})},this);return React.DOM.div({className:"daySlotsContainer"},b)},getRowActionItemIcon:function(){return React.DOM.i("copy"===this.props.data.currentMode?{className:"fa fa-clock-o"}:this.props.data.noSlots?{className:"fa fa-edit"}:{className:"glyphicon glyphicon-plus"})},getRowActionItemIconTitle:function(){return"copy"===this.props.data.currentMode?"Create time slots":this.props.data.noSlots?"Create slots":"Add new slot"},render:function(){return React.DOM.div({className:"day-slots-container"},React.DOM.div({className:"row"},React.DOM.div({className:"col-sm-2 text-left"},React.DOM.p({className:"text-bold schedule-text-middle"},this.props.data.day_name)),React.DOM.div({className:"col-sm-7"},this.getChild()),React.DOM.div({className:"col-sm-3 text-right"},React.DOM.a({className:"schedule-text-middle addNewSlot",title:this.getRowActionItemIconTitle(),onClick:this.addTimeSlot},this.getRowActionItemIcon()),React.DOM.a({className:"schedule-text-middle clearAllDaySlots",title:"Remove All Slots",onClick:this.removeAllTimeSlots},React.DOM.i({className:"glyphicon glyphicon-trash"})))))}}),DaysList=React.createClass({displayName:"DaysList",getInitialState:function(){return{data:[],fetched:!1,isDirty:!1,saving:!1,mostRecentChangeAt:new Date,intervalNumber:0,user:{}}},componentWillMount:function(){$.getJSON("/api/guru/schedule",function(a){_.each(a.schedule,function(a){_.each(a.slots,function(b,c){b.key=a.day_code+"_"+c},this),a.slotIndex=a.slots.length},this),this.setState({data:a.schedule,fetched:!0})}.bind(this)),$.getJSON("/api/user",function(a){a&&(this.setState({user:a}),mixpanel.identify(a.email),mixpanel.people.set({$email:a.email,$name:a.name,$last_login:new Date}),mixpanel.track("Visited Schedule page"))}.bind(this))},componentDidMount:function(){setInterval(function(){var a=moment(this.state.mostRecentChangeAt),b=moment(),c=b.diff(a);c>3e3&&this.state.isDirty&&this.saveData()}.bind(this),1e3)},saveData:function(){this.setState({isDirty:!1,saving:!0}),$.post("/api/guru/schedule",{schedule:this.state.data},function(){setTimeout(function(){this.setState({saving:!1})}.bind(this),500)}.bind(this)),mixpanel.track("Schedule modified and saved")},handleOnChange:function(a,b){this.setState({mostRecentChangeAt:new Date,isDirty:!0,data:_.map(this.state.data,function(c){if(c.day_code===a)for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);if("copy"===c.currentMode){var e=this.getCopyModeData(c);if(e.length)_.isObject(_.find(e,function(a){return c.selectedDayCode===a.day_code},this))||(c.selectedDayCode=e[0].day_code),c.noSlots=!1;else{var f=_.find(this.state.data,function(a){return a.slots.length});f||(c.noSlots=!0)}}return c},this)}),mixpanel.track("Schedule modified")},getCopyModeData:function(a){return"copy"!==a.currentMode?[]:this.state.data.filter(function(b){return!b.noSlots&&b.day_code!==a.day_code&&"copy"!==b.currentMode})},getSubmitButton:function(){return this.state.isDirty?React.DOM.button({className:"btn btn-success",id:"saveSchedule",onClick:this.saveData}," Save "):this.state.saving?React.DOM.button({className:"btn btn-success btn-loading"}," Saving.. "):React.DOM.button({className:"btn btn-primary"}," Saved ")},render:function(){var a=this.state.data.map(function(a){var b=this.getCopyModeData(a);return DayComponent({data:a,key:a._id,onDayChange:this.handleOnChange,copyModeData:b})},this),b=function(){return this.state.fetched?React.DOM.div(null,React.DOM.div({className:"day-slots-container"},React.DOM.div({className:"row"},React.DOM.div({className:"clearfix"},React.DOM.div({className:"pull-right"},this.getSubmitButton.call(this))))),a):React.DOM.div({className:"has-min-height"},Loading(null))}.bind(this);return React.DOM.div({className:"has-min-height"},React.DOM.h3(null,"Manage Schedule"),React.DOM.p({className:"text-light"}," People will make reservations against these timings. "),React.DOM.p({className:"text-light gwg-callout gwg-callout-info"}," Maintain the schedule below to reflect your availability. "),React.DOM.p({className:"text-light gwg-callout gwg-callout-warning"}," When we are close to launch, we'll let you fine tune schedule for each date. "),b())}});React.renderComponent(DaysList(null),document.getElementById("scheduleCreator"));
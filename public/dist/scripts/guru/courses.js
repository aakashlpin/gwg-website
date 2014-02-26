var CourseManagement=React.createClass({displayName:"CourseManagement",_getEmptyFormData:function(){return{name:"",description:"",target_audience:[{id:"beg",selected:!0,name:"Beginner"},{id:"inter",selected:!0,name:"Intermediate"},{id:"adv",selected:!0,name:"Advanced"}],classes:"",fee:""}},getInitialState:function(){return{courses:[],new_course:this._getEmptyFormData(),user:{}}},componentWillMount:function(){$.getJSON("/api/guru/courses",function(a){this.setState({courses:a}),this.state.courses.length||this.toggleAddCourseForm()}.bind(this)),$.getJSON("/api/user",function(a){a&&(this.setState({user:a}),mixpanel.identify(a.email),mixpanel.people.set({$email:a.email,$name:a.name,$last_login:new Date}),mixpanel.track("Visited Course page"))}.bind(this))},toggleAddCourseForm:function(){$(this.getDOMNode()).find("#courseFormContainer").fadeToggle("fast").find("input#name").focus()},_resetForm:function(){this.state.new_course=this._getEmptyFormData(),this.setState({new_course:this.state.new_course}),$(this.getDOMNode()).find("#courseFormContainer").fadeToggle()},handleNewCourseFormSubmit:function(a){a.preventDefault();var b=!1;_.each(_.values(this.state.new_course),function(a){(_.isArray(a)||_.isString(a))&&(a.length||(b=!0)),_.isNumber(a)&&0>=a&&(b=!0)}),b||($.post("/api/guru/course",this.state.new_course,function(a){this.state.courses.push(a),this.setState({courses:this.state.courses}),this._resetForm()}.bind(this)),mixpanel.track("Created new course"))},validateTextInput:function(a){var b=$(a.target),c=b.val(),d=b.attr("id"),e=this.state.new_course;e[d]=c,this.setState({new_course:e})},validateNumberInput:function(a){var b=$(a.target),c=parseInt(b.val()),d=b.attr("id"),e=this.state.new_course;e[d]=_.isNaN(c)?"":c,this.setState({new_course:e})},_handleCheckboxChange:function(a){var b=this.state.new_course.target_audience.map(function(b){return{id:b.id,selected:b.id===a?!b.selected:b.selected,name:b.name}});this.state.new_course.target_audience=b,this.setState({new_course:this.state.new_course})},_getTargetAudience:function(a){return a.target_audience.map(function(a){return a.selected?React.DOM.li({className:"item capitalize"},a.id):void 0},this)},render:function(){var a={display:"none"},b={"margin-top":60},c=this.state.new_course.target_audience.map(function(a){return React.DOM.label({className:"checkbox-inline",htmlFor:a.id},React.DOM.input({type:"checkbox",id:a.id,name:"target_audience",value:a.id,checked:a.selected,onChange:this._handleCheckboxChange.bind(this,a.id)}),a.name)},this),d=this.state.courses.map(function(a){return React.DOM.li({className:"item"},React.DOM.div({className:"row"},React.DOM.div({className:"col-md-7"},React.DOM.h4({className:"text-item-heading"},a.name),React.DOM.p({className:"text-light"},a.description)),React.DOM.div({className:"col-md-5"},React.DOM.div({className:"mb-10"},React.DOM.strong(null,"Classes: "),a.classes),React.DOM.div({className:"mb-10"},React.DOM.strong(null,"Fee: "),React.DOM.i({className:"fa fa-rupee"}),a.fee),React.DOM.div({className:"mb-10"},React.DOM.strong(null,"Audience: "),React.DOM.ul({className:"l-h-list inline-block"},this._getTargetAudience.call(this,a))))))},this);return React.DOM.div(null,React.DOM.div({className:"row"},React.DOM.div({className:"col-md-9"},React.DOM.h3(null,"Manage Courses"),React.DOM.p({className:"text-light"}," These courses will be a part of your online academy. "),React.DOM.p({className:"text-light gwg-callout gwg-callout-info"}," * When we are close to launch, we'll let you create full-fledged course plans. ")),React.DOM.div({className:"col-md-3"},React.DOM.div({className:"pull-right"},React.DOM.div({style:b}),React.DOM.a({id:"addNewCourse",onClick:this.toggleAddCourseForm},React.DOM.i({className:"fa fa-plus-circle"})," Add New Course ")))),React.DOM.div({id:"courseFormContainer",className:"text-left",style:a},React.DOM.div({className:"panel panel-default pad-10"},React.DOM.legend(null,"Add new course"),React.DOM.form({className:"form-horizontal",role:"form",onSubmit:this.handleNewCourseFormSubmit},React.DOM.div({className:"form-group"},React.DOM.label({className:"control-label col-sm-3",htmlFor:"name"},"Course Name"),React.DOM.div({className:"col-sm-7"},React.DOM.input({type:"text",className:"form-control",placeholder:"Carnatic Guitar Techniques",name:"name",id:"name",value:this.state.new_course.name,onChange:this.validateTextInput,required:"required"}))),React.DOM.div({className:"form-group"},React.DOM.label({className:"control-label col-sm-3",htmlFor:"description"},"Course Description"),React.DOM.div({className:"col-sm-7"},React.DOM.textarea({rows:"5",placeholder:"A capable guitarist wanting to learn left and right hand techniques, triads, vibrato, bending, picking techniques, how to arpeggiate chords etc",className:"form-control",name:"description",id:"description",value:this.state.new_course.description,onChange:this.validateTextInput,required:"required"}))),React.DOM.div({className:"form-group"},React.DOM.label({className:"control-label col-sm-3",htmlFor:"classes"},"Number of sessions"),React.DOM.div({className:"col-sm-3"},React.DOM.input({type:"text",name:"classes",id:"classes",className:"form-control",placeholder:"12",value:this.state.new_course.classes,onChange:this.validateNumberInput,required:"required"}))),React.DOM.div({className:"form-group"},React.DOM.label({className:"control-label col-sm-3",htmlFor:"fee"},"Total Course Fee"),React.DOM.div({className:"col-sm-3"},React.DOM.div({className:"input-group"},React.DOM.span({className:"input-group-addon"},"Rs."),React.DOM.input({type:"text",name:"fee",id:"fee",className:"form-control",placeholder:"6000",value:this.state.new_course.fee,required:"required",onChange:this.validateNumberInput})))),React.DOM.div({className:"form-group"},React.DOM.label({className:"control-label col-sm-3",htmlFor:"target_audience"},"Target Audience"),React.DOM.div({className:"col-sm-7"},c)),React.DOM.div({className:"form-group"},React.DOM.div({className:"col-sm-offset-3 col-sm-9"},React.DOM.button({type:"submit",className:"btn btn-success mr-20",id:"saveSchedule"},"Save"),React.DOM.a({className:"btn btn-link",onClick:this._resetForm},"Cancel")))))),React.DOM.div({className:"mb-40"}),React.DOM.div({id:"existingCourses",className:"has-min-height"},React.DOM.ul({className:"l-v-list v-flat-list list-unstyled"},d)))}});React.renderComponent(CourseManagement(null),document.getElementById("courseManagement"));
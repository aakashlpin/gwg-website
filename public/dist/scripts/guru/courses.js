/*** @jsx React.DOM */

var CourseManagement = React.createClass({displayName: 'CourseManagement',
    _getEmptyFormData: function() {
        return {
            name: '',
            description: '',
            target_audience: [{
                id: 'beg',
                selected: true,
                name: 'Beginner'
            }, {
                id: 'inter',
                selected: true,
                name: 'Intermediate'
            }, {
                id: 'adv',
                selected: true,
                name: 'Advanced'
            }],
            classes: '',
            fee: ''
        };
    },
    getInitialState: function() {
        return {
            courses: [],
            new_course: this._getEmptyFormData(),
            user: {}
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/courses', function(courses) {
            this.setState({courses: courses});
            if (!this.state.courses.length) {
                this.toggleAddCourseForm();
            }
        }.bind(this));

        $.getJSON('/api/user', function(user) {
            if (!user) return;
            this.setState({user: user});

            mixpanel.identify(user.email);
            mixpanel.people.set({
                "$email": user.email,
                "$name": user.name,
                "$last_login": new Date()
            });

            mixpanel.track('Visited Course page');

        }.bind(this));

    },
    toggleAddCourseForm: function() {
        $(this.getDOMNode())
            .find('#courseFormContainer').fadeToggle('fast')
            .find('input#name').focus();

    },
    _resetForm: function() {
        this.state.new_course = this._getEmptyFormData();
        this.setState({new_course: this.state.new_course});

        $(this.getDOMNode()).find('#courseFormContainer').fadeToggle();

    },
    handleNewCourseFormSubmit: function(e) {
        e.preventDefault();
        var hasErrors = false;
        _.each(_.values(this.state.new_course), function(item){
            if (_.isArray(item) || _.isString(item)) {
                if (!item.length)
                    hasErrors = true;
            }
            if (_.isNumber(item)) {
                if (item <= 0)
                    hasErrors = true;
            }
        });

        if (hasErrors) {
            //msg: please fix the issues in red.
        } else {
            //all good.
            //sync the data with server
            //add the new item to current list
            $.post('/api/guru/course', this.state.new_course, function(course) {
                this.state.courses.push(course);
                this.setState({courses: this.state.courses});
                this._resetForm();
            }.bind(this));

            mixpanel.track('Created new course');
        }
    },
    validateTextInput: function(e) {
        var target = $(e.target),
            currentValue = target.val(),
            currentElem = target.attr('id');

        var setStateObject = this.state.new_course;
        setStateObject[currentElem] = currentValue;
        this.setState({new_course: setStateObject});

    },
    validateNumberInput: function(e) {
        var target = $(e.target),
            currentValue = parseInt(target.val()),
            currentElem = target.attr('id');

        var setStateObject = this.state.new_course;
        setStateObject[currentElem] = _.isNaN(currentValue) ? '': currentValue;
        this.setState({new_course: setStateObject});

    },
    _handleCheckboxChange: function(id) {
        var targetAudience = this.state.new_course.target_audience.map(function(target) {
            return {
                id: target.id,
                selected: target.id === id ? !target.selected : target.selected,
                name: target.name
            }
        });

        this.state.new_course.target_audience = targetAudience;
        this.setState({new_course: this.state.new_course});

    },
    _getTargetAudience: function(course) {
        return course.target_audience.map(function(member){
            //if audience member is not selected, return
            if (!member.selected) return;
            //else return the member item
            return (
                React.DOM.li( {className:"item capitalize"}, member.id)
                )
        }, this);

    },
    render: function() {
        var hide    = {display:'none'},
            mt60    = {'margin-top': 60};

        var targetAudienceChecks = this.state.new_course.target_audience.map(function(target) {
            return (
                React.DOM.label( {className:"checkbox-inline", htmlFor:target.id}, 
                    React.DOM.input( {type:"checkbox", id:target.id, name:"target_audience",
                    value:target.id, checked:target.selected,
                    onChange:this._handleCheckboxChange.bind(this, target.id)}), target.name
                )
                );
        }, this);

        var existingCourses = this.state.courses.map(function(course) {
            return (
                React.DOM.li( {className:"item"}, 
                    React.DOM.div( {className:"row"}, 
                        React.DOM.div( {className:"col-md-7"}, 
                            React.DOM.h4( {className:"text-item-heading"}, course.name),
                            React.DOM.p( {className:"text-light"}, course.description)
                        ),
                        React.DOM.div( {className:"col-md-5"}, 
                            React.DOM.div( {className:"mb-10"}, React.DOM.strong(null, "Classes: " ), course.classes),
                            React.DOM.div( {className:"mb-10"}, React.DOM.strong(null, "Fee: " ), React.DOM.i( {className:"fa fa-rupee"}), course.fee),
                            React.DOM.div( {className:"mb-10"}, React.DOM.strong(null, "Audience: " ),
                                React.DOM.ul( {className:"l-h-list inline-block"}, 
                                this._getTargetAudience.call(this, course)
                                )
                            )
                        )
                    )
                )
                );
        }, this);

        return (
            React.DOM.div(null, 
                React.DOM.div( {className:"row"}, 
                    React.DOM.div( {className:"col-md-9"}, 
                        React.DOM.h3(null, "Manage Courses"),
                        React.DOM.p( {className:"text-light"}, 
                        " These courses will be a part of your online academy. "
                        ),
                        React.DOM.p( {className:"text-light gwg-callout gwg-callout-info"}, 
                        " * When we are close to launch, we'll let you create full-fledged course plans. "
                        )
                    ),
                    React.DOM.div( {className:"col-md-3"}, 
                        React.DOM.div( {className:"pull-right"}, 
                            React.DOM.div( {style:mt60}),
                            React.DOM.a( {id:"addNewCourse", onClick:this.toggleAddCourseForm}, 
                                React.DOM.i( {className:"fa fa-plus-circle"}), " Add New Course "
                            )
                        )
                    )
                ),
                React.DOM.div( {id:"courseFormContainer", className:"text-left", style:hide}, 
                    React.DOM.div( {className:"panel panel-default pad-10"}, 
                        React.DOM.legend(null, "Add new course"),
                        React.DOM.form( {className:"form-horizontal", role:"form", onSubmit:this.handleNewCourseFormSubmit}, 
                            React.DOM.div( {className:"form-group"}, 
                                React.DOM.label( {className:"control-label col-sm-3", htmlFor:"name"}, "Course Name"),
                                React.DOM.div( {className:"col-sm-7"}, 
                                    React.DOM.input( {type:"text", className:"form-control",
                                    placeholder:"Carnatic Guitar Techniques",
                                    name:"name",
                                    id:"name",
                                    value:this.state.new_course.name,
                                    onChange:this.validateTextInput,
                                    required:"required"}
                                    )
                                )
                            ),
                            React.DOM.div( {className:"form-group"}, 
                                React.DOM.label( {className:"control-label col-sm-3", htmlFor:"description"}, "Course Description"),
                                React.DOM.div( {className:"col-sm-7"}, 
                                    React.DOM.textarea( {rows:"5",
                                    placeholder:"A capable guitarist wanting to learn left and right hand techniques, triads, vibrato, bending, picking techniques, how to arpeggiate chords etc",
                                    className:"form-control",
                                    name:"description",
                                    id:"description",
                                    value:this.state.new_course.description,
                                    onChange:this.validateTextInput,
                                    required:"required"}
                                    )
                                )
                            ),
                            React.DOM.div( {className:"form-group"}, 
                                React.DOM.label( {className:"control-label col-sm-3", htmlFor:"classes"}, "Number of sessions"),
                                React.DOM.div( {className:"col-sm-3"}, 
                                    React.DOM.input( {type:"text",
                                    name:"classes",
                                    id:"classes",
                                    className:"form-control",
                                    placeholder:"12",
                                    value:this.state.new_course.classes,
                                    onChange:this.validateNumberInput,
                                    required:"required"}
                                    )
                                )
                            ),
                            React.DOM.div( {className:"form-group"}, 
                                React.DOM.label( {className:"control-label col-sm-3", htmlFor:"fee"}, "Total Course Fee"),
                                React.DOM.div( {className:"col-sm-3"}, 
                                    React.DOM.div( {className:"input-group"}, 
                                        React.DOM.span( {className:"input-group-addon"}, "Rs."),
                                        React.DOM.input( {type:"text",
                                        name:"fee",
                                        id:"fee",
                                        className:"form-control",
                                        placeholder:"6000",
                                        value:this.state.new_course.fee,
                                        required:"required",
                                        onChange:this.validateNumberInput}
                                        )
                                    )
                                )
                            ),
                            React.DOM.div( {className:"form-group"}, 
                                React.DOM.label( {className:"control-label col-sm-3", htmlFor:"target_audience"}, "Target Audience"),
                                React.DOM.div( {className:"col-sm-7"}, 
                                targetAudienceChecks
                                )
                            ),
                            React.DOM.div( {className:"form-group"}, 
                                React.DOM.div( {className:"col-sm-offset-3 col-sm-9"}, 
                                    React.DOM.button( {type:"submit", className:"btn btn-success mr-20", id:"saveSchedule"}, "Save"),
                                    React.DOM.a( {className:"btn btn-link", onClick:this._resetForm}, "Cancel")
                                )
                            )
                        )
                    )
                ),
                React.DOM.div( {className:"mb-40"}),
                React.DOM.div( {id:"existingCourses", className:"has-min-height"}, 
                    React.DOM.ul( {className:"l-v-list v-flat-list list-unstyled"}, 
                    existingCourses
                    )
                )
            )
            );
    }
});


React.renderComponent(
    CourseManagement(null ),
    document.getElementById('courseManagement')
);
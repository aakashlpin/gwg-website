/*** @jsx React.DOM */

var TextInput = React.createClass({displayName: 'TextInput',
    validateTextInput: function(e) {
        var target = $(e.target),
            currentValue = target.val();

        function isNumber(n) {
            return !isNaN(parseInt(n)) && isFinite(n);
        }

        switch (this.props.data.type) {
            case 'input[type="text"]':
                this.props.data.value = currentValue;
                break;
            case 'input[type="number"]':
                if (!currentValue) {
                    //allow empty values so that it can be retyped
                    this.props.data.value = currentValue;
                } else {
                    this.props.data.value = isNumber(currentValue) ? currentValue: this.props.data.value;
                }
                break;
        }

        this.props.onChange(this.props.key, this.props.data);

    },
    render: function() {
        return (
            React.DOM.div( {className:"form-group"}, 
                React.DOM.label( {className:"control-label col-sm-3", htmlFor:this.props.key}, this.props.data.name),
                React.DOM.div( {className:"col-sm-7"}, 
                    React.DOM.input(
                    {type:         "text",
                    className:    "form-control",
                    placeholder:  this.props.data.placeholder,
                    value:        this.props.data.value,
                    onChange:     this.validateTextInput,
                    name:         this.props.key,
                    id:           this.props.key,
                    required:     this.props.data.required}
                    )
                )
            )
            )
    }
});

var TextArea = React.createClass({displayName: 'TextArea',
    validateTextInput: function(e) {
        var target = $(e.target);

        this.props.data.value = target.val();
        this.props.onChange(this.props.key, this.props.data);

    },
    render: function() {
        return (
            React.DOM.div( {className:"form-group"}, 
                React.DOM.label( {className:"control-label col-sm-3", htmlFor:this.props.key}, this.props.data.name),
                React.DOM.div( {className:"col-sm-7"}, 
                    React.DOM.textarea(
                    {rows:         "5",
                    className:    "form-control",
                    placeholder:  this.props.data.placeholder,
                    value:        this.props.data.value,
                    onChange:     this.validateTextInput,
                    name:         this.props.key,
                    id:           this.props.key,
                    required:     this.props.data.required}
                    )
                )
            )
            )
    }
});

var CheckboxInput = React.createClass({displayName: 'CheckboxInput',
    _handleCheckboxChange: function(id) {
        this.props.data.value = this.props.data.value.map(function(target) {
            target.selected = target.id === id ? !target.selected : target.selected;
            return target;
        });

        this.props.onChange(this.props.key, this.props.data);
    },
    render: function() {
        var checkBoxGroup = this.props.data.value.map(function(checkboxItem) {
            return (
                React.DOM.label( {className:"checkbox-inline", htmlFor:checkboxItem.id}, 
                    React.DOM.input(
                    {type:         "checkbox",
                    id:           checkboxItem.id,
                    name:         this.props.key,
                    value:        checkboxItem.id,
                    checked:      checkboxItem.selected,
                    onChange:     this._handleCheckboxChange.bind(this, checkboxItem.id)}
                    ),
                checkboxItem.name
                )
                )
        }.bind(this));

        return (
            React.DOM.div( {className:"form-group"}, 
                React.DOM.label( {className:"control-label col-sm-3", htmlFor:this.props.key}, this.props.data.name),
                React.DOM.div( {className:"col-sm-7"}, 
                checkBoxGroup
                )
            )
            )
    }
});

var NewCourse = React.createClass({displayName: 'NewCourse',
    _getEmptyFormData: function() {
        return {
            name: {
                name: 'Name',
                type: 'input[type="text"]',
                value: '',
                required: true,
                placeholder: 'Carnatic Guitar Techniques'
            },
            description: {
                name: 'Description',
                type: 'textarea',
                value: '',
                required: true,
                placeholder: "A capable guitarist wanting to learn left and right hand techniques, triads, vibrato, bending, picking techniques, how to arpeggiate chords etc"
            },
            target_audience: {
                name: 'Target Audience',
                type: 'input[type="checkbox"]',
                value: [{
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
                required: true
            },
            classes: {
                name: 'Number of classes',
                type: 'input[type="number"]',
                value: '',
                required: true,
                placeholder: '4'
            },
            fee: {
                name: 'Course fee (Rs.)',
                type: 'input[type="number"]',
                value: '',
                required: true,
                placeholder: '2000'
            }
        }
    },
    getInitialState: function() {
        return this._getEmptyFormData();

    },
    handleTextFieldChange: function(key, data) {
        var updatedState = {};
        updatedState[key] = data;
        this.setState(updatedState);

    },
    handleCheckboxChange: function(key, data) {
        var updatedState = {};
        updatedState[key] = data;
        this.setState(updatedState);

    },
    _resetForm: function() {
        this.setState(this._getEmptyFormData());
        this.props.onFormVisibility(false);
//        $(this.getDOMNode()).find('#courseFormContainer').fadeToggle();

    },
    handleNewCourseFormSubmit: function(e) {
        e.preventDefault();
        var payload = {};
        _.each(_.keys(this.state), function(formItemKey) {
            payload[formItemKey] = this.state[formItemKey].value;

        }, this);

        $.post('/api/guru/course', payload, function(course) {
            this.props.onNewCourse(course);
            this._resetForm();

        }.bind(this));

        mixpanel.track('Created new course');
    },
    render: function() {
        var formDOMElements = _.keys(this.state).map(function(formItemKey) {
            var formItemValue = this.state[formItemKey];
            switch (formItemValue.type) {
                case 'textarea':
                    return (TextArea( {data:formItemValue, key:formItemKey, onChange:this.handleTextFieldChange} ));
                    break;
                case 'input[type="checkbox"]':
                    return (CheckboxInput( {data:formItemValue, key:formItemKey, onChange:this.handleCheckboxChange}));
                    break;
                default:
                    return (TextInput( {data:formItemValue, key:formItemKey, onChange:this.handleTextFieldChange} ));
            }
        }.bind(this));

        var formDOMParent = function() {
            if (this.props.isVisible) {
                return (
                    React.DOM.div( {id:"courseFormContainer", className:"text-left"}, 
                        React.DOM.div( {className:"panel panel-default pad-10"}, 
                            React.DOM.legend(null, "Add new course"),
                            React.DOM.form( {className:"form-horizontal", role:"form", onSubmit:this.handleNewCourseFormSubmit}, 
                                formDOMElements,
                                React.DOM.div( {className:"form-group"}, 
                                    React.DOM.div( {className:"col-sm-offset-3 col-sm-9"}, 
                                        React.DOM.button( {type:"submit", className:"btn btn-success mr-20", id:"saveSchedule"}, "Save"),
                                        React.DOM.a( {className:"btn btn-link", onClick:this._resetForm}, "Cancel")
                                    )
                                )
                            )
                        )
                    )
                    )
            } else {
                return (
                    React.DOM.div(null )
                    )
            }

        };

        return (React.DOM.div(null, formDOMParent.call(this)));
    }
});

var CourseManagement = React.createClass({displayName: 'CourseManagement',
    getInitialState: function() {
        return {
            courses: [],
            user: {},
            isNewCourseFormVisible: false
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/courses', function(courses) {
            this.setState({courses: courses});
            if (!this.state.courses.length) {
                this.handleFormVisibility(true);
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
    /*
     validateNumberInput: function(e) {
     var target = $(e.target),
     currentValue = parseInt(target.val()),
     currentElem = target.attr('id');

     var setStateObject = this.state.new_course;
     setStateObject[currentElem] = _.isNaN(currentValue) ? '': currentValue;
     this.setState({new_course: setStateObject});

     },*/
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
    handleNewCourse: function(courseObject) {
        this.state.courses.push(courseObject);
        this.setState({courses: this.state.courses});
        this.handleFormVisibility(false);

    },
    handleFormVisibility: function(visibility) {
        this.setState({isNewCourseFormVisible: visibility});

    },
    render: function() {
        var mt60    = {'margin-top': 60};

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
                        )
                    ),
                    React.DOM.div( {className:"col-md-3"}, 
                        React.DOM.div( {className:"pull-right"}, 
                            React.DOM.div( {style:mt60}),
                            React.DOM.a( {id:"addNewCourse", onClick:this.handleFormVisibility.bind(this, true)}, 
                                React.DOM.i( {className:"fa fa-plus-circle"}), " Add New Course "
                            )
                        )
                    )
                ),
                NewCourse(
                {onNewCourse:          this.handleNewCourse,
                isVisible:            this.state.isNewCourseFormVisible,
                onFormVisibility:     this.handleFormVisibility}
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
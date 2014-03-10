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
        if (!this.props.course) {
            //add new course
            return this._getEmptyFormData();

        } else {
            //edit existing course. map the existing values to empty form data
            var formData = this._getEmptyFormData();
            _.each(_.keys(formData), function(formItemKey) {
                formData[formItemKey].value = this.props.course[formItemKey];
            }, this);
            
            //so that it can be uniquely identified on the server
            formData._id = this.props.course._id;
            return formData;
        }

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
        if (!this.props.course) {
            this.setState(this._getEmptyFormData());

        }
        if (this.props.onFormVisibility) {
            this.props.onFormVisibility(false);
        }

    },
    handleNewCourseFormSubmit: function(e) {
        e.preventDefault();
        var payload = {};
        _.each(_.keys(this.state), function(formItemKey) {
            payload[formItemKey] = this.state[formItemKey].value;

        }, this);

        if (!this.props.course) {
            $.post('/api/guru/course', payload, function(course) {
                this.props.onNewCourse(course);
                this._resetForm();
                mixpanel.track('Created new course', course);

            }.bind(this));

        } else {
            payload._id = this.state._id;
            $.ajax({
                url: '/api/guru/course',
                type: 'PUT',
                data: payload,
                dataType: 'json',
                success: function(course) {
                    this.props.onCourseEdited(course);
                    this._resetForm();
                    mixpanel.track('Edited course', course);

                }.bind(this)
            });

        }
    },
    render: function() {
        var formDOMElements = _.keys(this.state).map(function(formItemKey) {
            var formItemValue = this.state[formItemKey];
            if (!formItemValue.type) { return null; }
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

var ExistingCourseItem = React.createClass({displayName: 'ExistingCourseItem',
    getInitialState: function() {
        return {
            isEditMode: false
        }
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
    handleOnDelete: function(e) {
        e.preventDefault();
        //TODO later change it to something more fancy
        if (confirm("Are you sure you want to delete this course?")) {
            this.props.onDeleteCourse(this.props.course._id);
        }

    },
    handleOnEdit: function() {
        this.setState({
            isEditMode: true
        });

    },
    handleOnCourseEdited: function(course) {
        this.props.onCourseChange(course);
        this.setState({
            isEditMode: false
        });

    },
    render: function() {
        if (this.state.isEditMode) {
            return (
                React.DOM.li( {className:"item"}, 
                    NewCourse( {course:this.props.course, isVisible:true, onCourseEdited:this.handleOnCourseEdited})
                )
                )
        }
        return (
            React.DOM.li( {className:"item"}, 
                React.DOM.div( {className:"row"}, 
                    React.DOM.div( {className:"col-md-7"}, 
                        React.DOM.h4( {className:"text-item-heading"}, this.props.course.name),
                        React.DOM.p( {className:"text-light"}, this.props.course.description)
                    ),
                    React.DOM.div( {className:"col-md-5"}, 
                        React.DOM.div( {className:"mb-10"}, React.DOM.strong(null, "Classes: " ), this.props.course.classes),
                        React.DOM.div( {className:"mb-10"}, React.DOM.strong(null, "Fee: " ), React.DOM.i( {className:"fa fa-rupee"}),
                        this.props.course.fee
                        ),
                        React.DOM.div( {className:"mb-10"}, React.DOM.strong(null, "Audience: " ),
                            React.DOM.ul( {className:"l-h-list inline-block"}, 
                                this._getTargetAudience.call(this, this.props.course)
                            )
                        ),

                        React.DOM.div( {className:"action"}, 
                            React.DOM.a( {className:"editCourse", onClick:this.handleOnEdit}, 
                                React.DOM.i( {className:"fa fa-pencil-square-o"}), " Edit Course "
                            ),
                            React.DOM.a( {className:"deleteCourse", onClick:this.handleOnDelete}, 
                                React.DOM.i( {className:"fa fa-trash-o"}), " Delete Course "
                            )
                        )
                    )
                )
            )
            )
    }

});

var ExistingCourses = React.createClass({displayName: 'ExistingCourses',
    render: function() {
        var existingCourses = this.props.courses.map(function(course) {
            return (
                ExistingCourseItem( 
                    {course:course,
                    onDeleteCourse:this.props.onDeleteCourse,
                    onCourseChange:this.props.onCourseChange}
                )
                );
        }, this);

        return (
            React.DOM.div( {id:"existingCourses", className:"has-min-height"}, 
                React.DOM.ul( {className:"l-v-list v-flat-list list-unstyled"}, 
                    existingCourses
                )
            )
            );
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
    handleNewCourse: function(courseObject) {
        this.state.courses.push(courseObject);
        this.setState({courses: this.state.courses});
        this.handleFormVisibility(false);

    },
    handleFormVisibility: function(visibility) {
        this.setState({isNewCourseFormVisible: visibility});

    },
    handleOnDeleteCourse: function(courseId) {
        this.state.courses = _.reject(this.state.courses, function(course){
            return course._id === courseId;
        }, this);

        this.setState({courses: this.state.courses});

        //sync
        $.ajax({
            url: '/api/guru/course',
            method: 'DELETE',
            dataType: 'json',
            data: {_id: courseId}
        });

    },
    handleOnCourseChange: function(courseObject) {
        this.setState({
            courses: this.state.courses.map(function(course) {
                if (course._id === courseObject._id) {
                    return courseObject;
                } else return course;
            }, this)
        });
        
    },
    render: function() {
        var mt60    = {'margin-top': 60};
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
                ExistingCourses(
                {courses:          this.state.courses,
                onDeleteCourse:   this.handleOnDeleteCourse,
                onCourseChange:   this.handleOnCourseChange}
                )
            )
            );
    }
});


React.renderComponent(
    CourseManagement(null ),
    document.getElementById('courseManagement')
);
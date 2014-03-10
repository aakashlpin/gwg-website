/*** @jsx React.DOM */

var TextInput = React.createClass({
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
            <div className='form-group'>
                <label className="control-label col-sm-3" htmlFor={this.props.key}>{this.props.data.name}</label>
                <div className="col-sm-7">
                    <input
                    type        = "text"
                    className   = "form-control"
                    placeholder = {this.props.data.placeholder}
                    value       = {this.props.data.value}
                    onChange    = {this.validateTextInput}
                    name        = {this.props.key}
                    id          = {this.props.key}
                    required    = {this.props.data.required}
                    />
                </div>
            </div>
            )
    }
});

var TextArea = React.createClass({
    validateTextInput: function(e) {
        var target = $(e.target);

        this.props.data.value = target.val();
        this.props.onChange(this.props.key, this.props.data);

    },
    render: function() {
        return (
            <div className='form-group'>
                <label className="control-label col-sm-3" htmlFor={this.props.key}>{this.props.data.name}</label>
                <div className="col-sm-7">
                    <textarea
                    rows        = "5"
                    className   = "form-control"
                    placeholder = {this.props.data.placeholder}
                    value       = {this.props.data.value}
                    onChange    = {this.validateTextInput}
                    name        = {this.props.key}
                    id          = {this.props.key}
                    required    = {this.props.data.required}
                    />
                </div>
            </div>
            )
    }
});

var CheckboxInput = React.createClass({
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
                <label className="checkbox-inline" htmlFor={checkboxItem.id}>
                    <input
                    type        = "checkbox"
                    id          = {checkboxItem.id}
                    name        = {this.props.key}
                    value       = {checkboxItem.id}
                    checked     = {checkboxItem.selected}
                    onChange    = {this._handleCheckboxChange.bind(this, checkboxItem.id)}
                    />
                {checkboxItem.name}
                </label>
                )
        }.bind(this));

        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={this.props.key}>{this.props.data.name}</label>
                <div className="col-sm-7">
                {checkBoxGroup}
                </div>
            </div>
            )
    }
});

var NewCourse = React.createClass({
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
        } else {
            this.props.onCourseEditingCancelled();
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
                    return (<TextArea data={formItemValue} key={formItemKey} onChange={this.handleTextFieldChange} />);
                    break;
                case 'input[type="checkbox"]':
                    return (<CheckboxInput data={formItemValue} key={formItemKey} onChange={this.handleCheckboxChange}/>);
                    break;
                default:
                    return (<TextInput data={formItemValue} key={formItemKey} onChange={this.handleTextFieldChange} />);
            }
        }.bind(this));

        var getLegend = function() {
            if (this.props.course) {
                return 'Edit course';
            } else {
                return 'Add new course';
            }
        };

        var getParentClasses = function() {
            if (this.props.course) {
                return '';
            } else {
                return 'panel panel-default pad-10';
            }

        };

        var formDOMParent = function() {
            if (this.props.isVisible) {
                return (
                    <div id="courseFormContainer" className="text-left">
                        <div className={getParentClasses.call(this)}>
                            <legend>{getLegend.call(this)}</legend>
                            <form className="form-horizontal" role="form" onSubmit={this.handleNewCourseFormSubmit}>
                                {formDOMElements}
                                <div className="form-group">
                                    <div className="col-sm-offset-3 col-sm-9">
                                        <button type="submit" className="btn btn-success mr-20" id="saveSchedule">Save</button>
                                        <a className="btn btn-link" onClick={this._resetForm}>Cancel</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    )
            } else {
                return (
                    <div ></div>
                    )
            }

        };

        return (<div>{formDOMParent.call(this)}</div>);
    }
});

var ExistingCourseItem = React.createClass({
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
                <li className="item capitalize">{member.name}</li>
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
        this.onCourseEditingCancelled();

    },
    onCourseEditingCancelled: function() {
        this.setState({
            isEditMode: false
        });

    },
    render: function() {
        if (this.state.isEditMode) {
            return (
                <li className="item">
                    <NewCourse
                    course          = {this.props.course}
                    isVisible       = {true}
                    onCourseEdited  = {this.handleOnCourseEdited}
                    onCourseEditingCancelled = {this.onCourseEditingCancelled}
                    />
                </li>
                )
        }
        return (
            <li className="item">
                <div className="row">
                    <div className="col-md-7">
                        <h4 className="text-item-heading">{this.props.course.name}</h4>
                        <p className="text-light">{this.props.course.description}</p>
                    </div>
                    <div className="col-md-5 relative">
                        <div className="mb-10"><strong>Classes: </strong> {this.props.course.classes}</div>
                        <div className="mb-10"><strong>Fee: </strong> <i className="fa fa-rupee"></i>
                        {this.props.course.fee}
                        </div>
                        <div className="mb-10"><strong>Audience: </strong>
                            <ul className="l-h-list inline-block">
                                {this._getTargetAudience.call(this, this.props.course)}
                            </ul>
                        </div>

                        <div className="course-action">
                            <a className="editCourse mr-10" onClick={this.handleOnEdit}>
                                <i className="fa fa-pencil-square-o"></i> Edit
                            </a>
                            <a className="deleteCourse" onClick={this.handleOnDelete}>
                                <i className="fa fa-trash-o"></i> Delete
                            </a>
                        </div>
                    </div>
                </div>
            </li>
            )
    }

});

var ExistingCourses = React.createClass({
    render: function() {
        var existingCourses = this.props.courses.map(function(course) {
            return (
                <ExistingCourseItem 
                    course={course}
                    onDeleteCourse={this.props.onDeleteCourse}
                    onCourseChange={this.props.onCourseChange}
                />
                );
        }, this);

        return (
            <div id="existingCourses" className="has-min-height">
                <ul className="l-v-list v-flat-list list-unstyled">
                    {existingCourses}
                </ul>
            </div>
            );
    }

});

var CourseManagement = React.createClass({
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

        $.getJSON('/api/guru/user', function(user) {
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
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <h3>Manage Courses</h3>
                        <p className="text-light">
                        These courses will be a part of your online academy.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <div className="pull-right">
                            <div style={mt60}></div>
                            <a id="addNewCourse" onClick={this.handleFormVisibility.bind(this, true)}>
                                <i className="fa fa-plus-circle"></i> Add New Course
                            </a>
                        </div>
                    </div>
                </div>
                <NewCourse
                onNewCourse         = {this.handleNewCourse}
                isVisible           = {this.state.isNewCourseFormVisible}
                onFormVisibility    = {this.handleFormVisibility}
                />
                <div className="mb-40"></div>
                <ExistingCourses
                courses         = {this.state.courses}
                onDeleteCourse  = {this.handleOnDeleteCourse}
                onCourseChange  = {this.handleOnCourseChange}
                />
            </div>
            );
    }
});


React.renderComponent(
    <CourseManagement />,
    document.getElementById('courseManagement')
);
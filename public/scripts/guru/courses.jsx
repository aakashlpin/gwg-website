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
                    return (<TextArea data={formItemValue} key={formItemKey} onChange={this.handleTextFieldChange} />);
                    break;
                case 'input[type="checkbox"]':
                    return (<CheckboxInput data={formItemValue} key={formItemKey} onChange={this.handleCheckboxChange}/>);
                    break;
                default:
                    return (<TextInput data={formItemValue} key={formItemKey} onChange={this.handleTextFieldChange} />);
            }
        }.bind(this));

        var formDOMParent = function() {
            if (this.props.isVisible) {
                return (
                    <div id="courseFormContainer" className="text-left">
                        <div className="panel panel-default pad-10">
                            <legend>Add new course</legend>
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
    _getTargetAudience: function(course) {
        return course.target_audience.map(function(member){
            //if audience member is not selected, return
            if (!member.selected) return;
            //else return the member item
            return (
                <li className="item capitalize">{member.id}</li>
                )
        }, this);

    },
    handleOnDelete: function(e) {
        e.preventDefault();
        this.props.onDeleteCourse(this.props.course._id);

    },
    render: function() {
        return (
            <li className="item">
                <div className="row">
                    <div className="col-md-7">
                        <h4 className="text-item-heading">{this.props.course.name}</h4>
                        <p className="text-light">{this.props.course.description}</p>
                    </div>
                    <div className="col-md-5">
                        <div className="mb-10"><strong>Classes: </strong> {this.props.course.classes}</div>
                        <div className="mb-10"><strong>Fee: </strong> <i className="fa fa-rupee"></i>
                        {this.props.course.fee}
                        </div>
                        <div className="mb-10"><strong>Audience: </strong>
                            <ul className="l-h-list inline-block">
                                {this._getTargetAudience.call(this, this.props.course)}
                            </ul>
                        </div>

                        <a className="deleteCourse" onClick={this.handleOnDelete}><i className="fa fa-trash-o"></i></a>
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
                <ExistingCourseItem course={course} onDeleteCourse={this.props.onDeleteCourse}/>
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
                <ExistingCourses courses={this.state.courses} onDeleteCourse={this.handleOnDeleteCourse}/>
            </div>
            );
    }
});


React.renderComponent(
    <CourseManagement />,
    document.getElementById('courseManagement')
);
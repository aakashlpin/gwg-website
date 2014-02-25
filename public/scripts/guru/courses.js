/*** @jsx React.DOM */

var CourseManagement = React.createClass({
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
            new_course: this._getEmptyFormData()
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/courses', function(courses) {
            this.setState({courses: courses});
            if (!this.state.courses.length) {
                this.toggleAddCourseForm();
            }
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
                <li className="item capitalize">{member.id}</li>
                )
        }, this);

    },
    render: function() {
        var hide    = {display:'none'},
            mt60    = {'margin-top': 60};

        var targetAudienceChecks = this.state.new_course.target_audience.map(function(target) {
            return (
                <label className="checkbox-inline" htmlFor={target.id}>
                    <input type="checkbox" id={target.id} name="target_audience"
                    value={target.id} checked={target.selected}
                    onChange={this._handleCheckboxChange.bind(this, target.id)}/> {target.name}
                </label>
                );
        }, this);

        var existingCourses = this.state.courses.map(function(course) {
            return (
                <li className="item">
                    <div className="row">
                        <div className="col-md-7">
                            <h4 className="text-item-heading">{course.name}</h4>
                            <p className="text-light">{course.description}</p>
                        </div>
                        <div className="col-md-5">
                            <div className="mb-10"><strong>Classes: </strong> {course.classes}</div>
                            <div className="mb-10"><strong>Fee: </strong> <i className="fa fa-rupee"></i> {course.fee}</div>
                            <div className="mb-10"><strong>Audience: </strong>
                                <ul className="l-h-list inline-block">
                                {this._getTargetAudience.call(this, course)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                );
        }, this);

        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <h3>Manage Courses</h3>
                        <p className="text-light">
                        These courses will be a part of your online academy.
                        </p>
                        <p className="text-light gwg-callout gwg-callout-info">
                        * When we are close to launch, we'll let you create full-fledged course plans.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <div className="pull-right">
                            <div style={mt60}></div>
                            <a id="addNewCourse" onClick={this.toggleAddCourseForm}>
                                <i className="fa fa-plus-circle"></i> Add New Course
                            </a>
                        </div>
                    </div>
                </div>
                <div id="courseFormContainer" className="text-left" style={hide}>
                    <div className="panel panel-default pad-10">
                        <legend>Add new course</legend>
                        <form className="form-horizontal" role="form" onSubmit={this.handleNewCourseFormSubmit}>
                            <div className='form-group'>
                                <label className="control-label col-sm-3" htmlFor="name">Course Name</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control"
                                    placeholder="Carnatic Guitar Techniques"
                                    name="name"
                                    id="name"
                                    value={this.state.new_course.name}
                                    onChange={this.validateTextInput}
                                    required="required"
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className="control-label col-sm-3" htmlFor="description">Course Description</label>
                                <div className="col-sm-7">
                                    <textarea rows="5"
                                    placeholder="A capable guitarist wanting to learn left and right hand techniques, triads, vibrato, bending, picking techniques, how to arpeggiate chords etc"
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    value={this.state.new_course.description}
                                    onChange={this.validateTextInput}
                                    required="required"
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className="control-label col-sm-3" htmlFor="classes">Number of sessions</label>
                                <div className="col-sm-3">
                                    <input type="text"
                                    name="classes"
                                    id="classes"
                                    className="form-control"
                                    placeholder="12"
                                    value={this.state.new_course.classes}
                                    onChange={this.validateNumberInput}
                                    required="required"
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className="control-label col-sm-3" htmlFor="fee">Total Course Fee</label>
                                <div className="col-sm-3">
                                    <div className="input-group">
                                        <span className="input-group-addon">Rs.</span>
                                        <input type="text"
                                        name="fee"
                                        id="fee"
                                        className="form-control"
                                        placeholder="6000"
                                        value={this.state.new_course.fee}
                                        required="required"
                                        onChange={this.validateNumberInput}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="target_audience">Target Audience</label>
                                <div className="col-sm-7">
                                {targetAudienceChecks}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-3 col-sm-9">
                                    <button type="submit" className="btn btn-success mr-20" id="saveSchedule">Save</button>
                                    <a className="btn btn-link" onClick={this._resetForm}>Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mb-40"></div>
                <div id="existingCourses" className="has-min-height">
                    <ul className="l-v-list v-flat-list list-unstyled">
                    {existingCourses}
                    </ul>
                </div>
            </div>
            );
    }
});


React.renderComponent(
    <CourseManagement />,
    document.getElementById('courseManagement')
);
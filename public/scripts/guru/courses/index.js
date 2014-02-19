/*** @jsx React.DOM */

var CourseManagement = React.createClass({
    toggleAddCourseForm: function() {
        $(this.getDOMNode())
            .find('#courseFormContainer').fadeToggle('fast')
            .find('input#name').focus();

    },
    handleNewCourseFormSubmit: function() {
        //TODO validate data and sync
        //TODO maintain a local state of existing courses
    },
    render: function() {
        var hide = {display:'none'};
        var mt58 = {'margin-top': 58};
        return (
            <div>
                <div className="clearfix">
                    <div className="pull-left">
                        <h3>Manage Courses</h3>
                        <p>These courses will be shown in search results.</p>
                    </div>
                    <div className="pull-right">
                        <div style={mt58}></div>
                        <a id="addNewCourse" onClick={this.toggleAddCourseForm}>
                            <i className="fa fa-plus-circle"></i> Add New Course
                        </a>
                    </div>
                </div>
                <div id="courseFormContainer" className="text-left" style={hide}>
                    <div className="panel panel-default pad-10">
                        <h4>Add new course</h4>
                        <form className="form-horizontal" role="form" onSubmit={this.handleNewCourseFormSubmit}>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="name">Course Name</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" placeholder="Carnatic Guitar Techniques"
                                    name="name"
                                    id="name"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="description">Course Description</label>
                                <div className="col-sm-7">
                                    <textarea rows="5"
                                    placeholder="A capable guitarist wanting to learn left and right hand techniques, triads, vibrato, bending, picking techniques, how to arpeggiate chords etc"
                                    className="form-control"
                                    name="description"
                                    id="description" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="target_audience">Target Audience</label>
                                <div className="col-sm-7">
                                    <label className="checkbox-inline" htmlFor="beginner">
                                        <input type="checkbox" id="beginner" name="target_audience" value="beginner"/> Beginner
                                    </label>
                                    <label className="checkbox-inline" htmlFor="intermediate">
                                        <input type="checkbox" id="intermediate" name="target_audience" value="intermediate"/> Intermediate
                                    </label>
                                    <label className="checkbox-inline" htmlFor="advanced">
                                        <input type="checkbox" id="advanced" name="target_audience" value="advanced"/> Advanced
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="classes">Number of sessions</label>
                                <div className="col-sm-3">
                                    <input type="text" className="form-control" name="classes" id="classes"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-3" htmlFor="fee">Total Course Fee</label>
                                <div className="col-sm-3">
                                    <div className="input-group">
                                        <span className="input-group-addon">Rs.</span>
                                        <input type="text" className="form-control" name="fee" id="fee"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="clearfix mb-30">
                        <button className="btn btn-success pull-right" id="saveSchedule">Save</button>
                    </div>
                </div>

            </div>
            );
    }
});


React.renderComponent(
    <CourseManagement />,
    document.getElementById('courseManagement')
);
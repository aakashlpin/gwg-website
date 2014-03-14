/*** @jsx React.DOM */;
var ReservationManager;

ReservationManager = React.createClass({
  getInitialState: function() {
    return {
      reservations: [],
      students: [],
      courses: []
    };
  },
  componentWillMount: function() {
    return $.getJSON('/api/guru/reservations', (function(_this) {
      return function(res) {
        return _this.setState({
          reservations: res.reservations,
          students: res.students,
          courses: res.courses
        });
      };
    })(this));
  },
  render: function() {
    var body, bodyReservations, courseName, head, studentName;
    head = function() {
      return (<div>
          <h3>Reservations</h3>
          <p className="text-light gwg-callout gwg-callout-info">
          List of upcoming reservations for your courses
          </p>
        </div>
      );
    };
    courseName = (function(_this) {
      return function(courseId) {
        return _.find(_this.state.courses, function(course) {
          return course._id === courseId;
        }).name;
      };
    })(this);
    studentName = (function(_this) {
      return function(studentId) {
        return _.find(_this.state.students, function(student) {
          return student._id === studentId;
        }).name;
      };
    })(this);
    bodyReservations = (function(_this) {
      return function() {
        return _this.state.reservations.map(function(reservation) {
          return (<tr>
            <td>{moment(reservation.start).format('ddd, MMMM Do \'YY, h:mm a')}</td>
            <td>{courseName.call(this, reservation.courseId)}</td>
            <td>{studentName.call(this, reservation.studentId)}</td>
          </tr>
        );
        });
      };
    })(this);
    body = function() {
      return (<div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>On</th>
              <th>For course</th>
              <th>By student</th>
            </tr>
          </thead>
          <tbody>
            {bodyReservations.call(this)}
          </tbody>
        </table>
        </div>
      );
    };
    if (!this.state.reservations.length) {
      return (
          <div>{head.call(this)}</div>
      );
    } else {
      return (
          <div>
          {head.call(this)}
          {body.call(this)}
          </div>
      );
    }
  }
});

React.renderComponent(ReservationManager({}), document.getElementById('reservationsContent'));

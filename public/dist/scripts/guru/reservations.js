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
      return (React.DOM.div(null, 
          React.DOM.h3(null, "Reservations"),
          React.DOM.p( {className:"text-light gwg-callout gwg-callout-info"}, 
          " List of upcoming reservations for your courses "
          )
        )
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
          return (React.DOM.tr(null, 
            React.DOM.td(null, moment(reservation.start).format('ddd, MMMM Do \'YY, h:mm a')),
            React.DOM.td(null, courseName.call(this, reservation.courseId)),
            React.DOM.td(null, studentName.call(this, reservation.studentId))
          )
        );
        });
      };
    })(this);
    body = function() {
      return (React.DOM.div(null, 
        React.DOM.table( {className:"table table-striped table-hover"}, 
          React.DOM.thead(null, 
            React.DOM.tr(null, 
              React.DOM.th(null, "On"),
              React.DOM.th(null, "For course"),
              React.DOM.th(null, "By student")
            )
          ),
          React.DOM.tbody(null, 
            bodyReservations.call(this)
          )
        )
        )
      );
    };
    if (!this.state.reservations.length) {
      return (
          React.DOM.div(null, head.call(this))
      );
    } else {
      return (
          React.DOM.div(null, 
          head.call(this),
          body.call(this)
          )
      );
    }
  }
});

React.renderComponent(ReservationManager({}), document.getElementById('reservationsContent'));

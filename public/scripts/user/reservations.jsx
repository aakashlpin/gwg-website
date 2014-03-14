/*** @jsx React.DOM */;
var ReservationManager;

ReservationManager = React.createClass({
  getInitialState: function() {
    return {
      reservations: [],
      gurus: [],
      courses: []
    };
  },
  componentWillMount: function() {
    return $.getJSON('/api/user/reservations', (function(_this) {
      return function(res) {
        return _this.setState({
          reservations: res.reservations,
          gurus: res.gurus,
          courses: res.courses
        });
      };
    })(this));
  },
  render: function() {
    var body, bodyReservations, courseName, guruName, head;
    head = function() {
      return (<div>
          <h3>Reservations</h3>
          <p className="text-light gwg-callout gwg-callout-info">
          List of upcoming reservations you've made
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
    guruName = (function(_this) {
      return function(guruId) {
        return _.find(_this.state.gurus, function(guru) {
          return guru._id === guruId;
        }).name;
      };
    })(this);
    bodyReservations = (function(_this) {
      return function() {
        return _this.state.reservations.map(function(reservation) {
          return (<tr>
            <td>{moment(reservation.start).format('ddd, MMMM Do \'YY, h:mm a')}</td>
            <td>{courseName.call(this, reservation.courseId)}</td>
            <td>{guruName.call(this, reservation.guruId)}</td>
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
              <th>For Course</th>
              <th>From Guru</th>
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

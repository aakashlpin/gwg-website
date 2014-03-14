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
      return (React.DOM.div(null, 
          React.DOM.h3(null, "Reservations"),
          React.DOM.p( {className:"text-light gwg-callout gwg-callout-info"}, 
          " List of upcoming reservations you've made "
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
          return (React.DOM.tr(null, 
            React.DOM.td(null, moment(reservation.start).format('ddd, MMMM Do \'YY, h:mm a')),
            React.DOM.td(null, courseName.call(this, reservation.courseId)),
            React.DOM.td(null, guruName.call(this, reservation.guruId))
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
              React.DOM.th(null, "For Course"),
              React.DOM.th(null, "From Guru")
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
          React.DOM.div( {className:"has-min-height"}, 
          head.call(this),
          body.call(this)
          )
      );
    }
  }
});

React.renderComponent(ReservationManager({}), document.getElementById('reservationsContent'));

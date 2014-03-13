/*** @jsx React.DOM */;
var ReservationManager;

ReservationManager = React.createClass({
  getInitialState: function() {
    return {
      reservations: []
    };
  },
  componentWillMount: function() {
    return $.getJSON('/api/guru/reservations', (function(_this) {
      return function(reservations) {
        return console.log(reservations);
      };
    })(this));
  },
  getInitialDOM: function() {
    var body, head;
    head = function() {
      return (React.DOM.div(null, 
          React.DOM.h3(null, "Reservations"),
          React.DOM.p( {className:"text-light gwg-callout gwg-callout-info"}, 
          " List of upcoming reservations for your courses "
          )
        )
      );
    };
    body = function() {
      this.state.reservations.map(function(reservation) {});
      return (React.DOM.div(null, 
        reservation.courseId
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
  },
  render: function() {
    return this.getInitialDOM();
  }
});

React.renderComponent(ReservationManager({}), document.getElementById('reservationsContent'));

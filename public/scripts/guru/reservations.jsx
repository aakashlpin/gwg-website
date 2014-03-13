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
      return (<div>
          <h3>Reservations</h3>
          <p className="text-light gwg-callout gwg-callout-info">
          List of upcoming reservations for your courses
          </p>
        </div>
      );
    };
    body = function() {
      return this.state.reservations.map(function(reservation) {
        return (<div>
          {reservation.courseId}
          </div>
        );
      });
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
  },
  render: function() {
    return this.getInitialDOM();
  }
});

React.renderComponent(ReservationManager({}), document.getElementById('reservationsContent'));

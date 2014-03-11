/*** @jsx React.DOM */;
var BootstrapButton, BootstrapModal, Course, Courses, Schedule, SoundCloud, UserHelpers, Youtube;

UserHelpers = {
  getUserName: function() {
    return window.location.pathname.split('/')[1];
  }
};

BootstrapButton = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <a role="button" className="btn">
        {this.props.children}
      </a>
    );;
  }
});

BootstrapModal = React.createClass({
  componentDidMount: function() {
    return $(this.getDOMNode()).modal({
      backdrop: 'static',
      show: false
    }).on('shown.bs.modal', this.handleModalShown).on('hidden.bs.modal', this.handleModalClose);
  },
  close: function() {
    return $(this.getDOMNode()).modal('hide');
  },
  open: function() {
    return $(this.getDOMNode()).modal('show');
  },
  render: function() {
    var cancelButton, confirmButton;
    confirmButton = null;
    cancelButton = null;
    if (this.props.confirm) {
      confirmButton = 
      <BootstrapButton
        onClick={this.handleConfirm}
        className="btn-primary">
        {this.props.confirm}
      </BootstrapButton>;
    }
    if (this.props.cancel) {
      cancelButton = 
      <BootstrapButton
        onClick={this.handleCancel}>
        {this.props.cancel}
      </BootstrapButton>;
    }
    return (
      <div className="modal fade">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="m-0">{this.props.title}</h3>
            </div>
            <div className="modal-body"  id={this.props.id}>
            </div>
            <div className="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  },
  handleModalClose: function() {
    return $(this.getDOMNode()).find('.modal-body').empty();
  },
  handleModalShown: function() {
    var _base;
    return typeof (_base = this.props).onShown === "function" ? _base.onShown() : void 0;
  },
  handleCancel: function() {
    var _base;
    return typeof (_base = this.props).onCancel === "function" ? _base.onCancel() : void 0;
  },
  handleConfirm: function() {
    var _base;
    return typeof (_base = this.props).onConfirm === "function" ? _base.onConfirm() : void 0;
  }
});

Schedule = React.createClass({
  mixins: [UserHelpers],
  getDefaultProps: function() {
    return {
      reserved: []
    };
  },
  getInitialState: function() {
    return {
      slots: []
    };
  },
  componentWillMount: function() {
    return $.getJSON('/api/public/schedule', {
      username: this.getUserName()
    }, (function(_this) {
      return function(slotsRes) {
        return _this.setState({
          slots: slotsRes
        });
      };
    })(this));
  },
  componentDidUpdate: function() {
    var calendarElem;
    calendarElem = $(this.getDOMNode()).find('.schedule-calendar');
    return calendarElem.fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'month',
      editable: false,
      events: this.state.slots,
      eventClick: (function(_this) {
        return function(event) {
          var shouldUpdate;
          shouldUpdate = true;
          if (event.title === 'Available') {
            if (_this.props.reserved.length !== _this.props.classes) {
              _this.props.reserved.push(_.pick(event, ['_id', 'start', 'end']));
              _this.props.onScheduleChange(_this.props.reserved);
              event.title = 'Selected';
              event.color = '#e67e22';
            } else {
              shouldUpdate = false;
              noty({
                layout: 'topCenter',
                text: "Max classes chosen. Save and proceed",
                timeout: 2500,
                type: 'warning',
                killer: true
              });
              return;
            }
          } else {
            _this.props.reserved = _.reject(_this.props.reserved, function(reservedSlot) {
              return reservedSlot._id === event._id;
            });
            _this.props.onScheduleChange(_this.props.reserved);
            event.title = 'Available';
            event.color = '#3a87ad';
          }
          if (_this.props.reserved.length === _this.props.classes) {
            noty({
              layout: 'topCenter',
              text: "w00t! " + _this.props.classes + " classes selected. Save and proceed",
              type: 'success',
              killer: true
            });
          }
          if (shouldUpdate) {
            $(_this.getDOMNode()).find('.schedule-classes').html(_this.props.reserved.length);
            return calendarElem.fullCalendar('updateEvent', event);
          }
        };
      })(this)
    });
  },
  render: function() {
    this.scheduleMessageId = "schedule-messages_" + this.props.courseId;
    return (
      <div>
        <h5>
          Selected
          <span className="schedule-classes">{this.props.reserved.length}</span>
          of
          {this.props.classes}
        </h5>
        <div className="schedule-calendar"></div>
      </div>
      );
  }
});

Course = React.createClass({
  getInitialState: function() {
    return {
      reservedSlots: [],
      action: null
    };
  },
  reserveSlots: function() {
    this.setState({
      action: 'reserving'
    });
    return this.refs.modal.open();
  },
  handleCancel: function() {
    this.setState({
      action: null
    });
    return this.refs.modal.close();
  },
  handleOnReservationSuccess: function() {
    this.setState({
      action: 'reserved'
    });
    return this.refs.modal.close();
  },
  handleOnScheduleChange: function(reservedSlots) {
    return this.setState({
      reservedSlots: reservedSlots
    });
  },
  handleModalShown: function() {
    return React.renderComponent(Schedule({
      classes: this.props.course.classes,
      courseId: this.props.course._id,
      onScheduleChange: this.handleOnScheduleChange
    }), document.getElementById(this.modalId));
  },
  handleConfirm: function() {
    var payload;
    payload = {
      reserved: {
        courseId: this.props.course._id,
        slots: this.state.reservedSlots
      }
    };
    return $.post('/api/user/schedule', payload, (function(_this) {
      return function(res) {
        var newRedirectTo, parts, pathname, redirectTo, search;
        if (res.err) {
          return noty({
            type: 'error',
            layout: 'topCenter',
            text: res.err,
            timeout: 2500,
            killer: true
          });
        } else if (res.redirect) {
          redirectTo = res.redirect;
          parts = null;
          pathname = null;
          search = null;
          if (redirectTo.indexOf('?' > 0)) {
            parts = redirectTo.split('?');
          }
          if (parts) {
            pathname = parts[0];
            search = parts[1];
          } else {
            pathname = redirectTo;
          }
          newRedirectTo = window.location.origin + pathname + (search ? '?' + search : '');
          return window.location.href = newRedirectTo;
        } else if (res.success) {
          noty({
            type: 'success',
            layout: 'topCenter',
            text: res.success,
            timeout: 2500,
            killer: true
          });
          return _this.handleOnReservationSuccess();
        }
      };
    })(this));
  },
  render: function() {
    var audience, audienceItemDOM, modal, modalTitle, reserveBtn;
    this.modalId = "modal_" + this.props.course._id;
    modalTitle = "Reserve slots - " + this.props.course.name;
    modal = <BootstrapModal
      ref = "modal"
      confirm = "Done"
      cancel = "Go back"
      onConfirm = {this.handleConfirm}
      onCancel = {this.handleCancel}
      onShown = {this.handleModalShown}
      title = {modalTitle}
      id = {this.modalId}>
      </BootstrapModal>;
    audienceItemDOM = function(id) {
      if (id === "beg") {
        return (<span className="audience-item beg" title="Level: Beginner">B</span>);
      } else if (id === "inter") {
        return (<span className="audience-item inter" title="Level: Intermediate">I</span>);
      } else {
        return (<span className="audience-item adv" title="Level: Advanced">A</span>);
      }
    };
    audience = this.props.course.target_audience.map((function(_this) {
      return function(audienceItem) {
        if (audienceItem.selected) {
          return (
        <li className="item">
        {audienceItemDOM(audienceItem.id)}
        </li>
    );
        }
      };
    })(this));
    reserveBtn = function() {
      switch (this.state.action) {
        case 'reserving':
          return <button ref="reserveBtn" className="btn btn-warning">
              <span>Reserving... </span><i className="fa fa-headphones"></i>
          </button>;
        case 'reserved':
          return <button ref="reserveBtn" className="btn btn-success">
              <span>Reserved </span><i className="fa fa-headphones"></i>
          </button>;
        default:
          return <button ref="reserveBtn" className="btn btn-primary" onClick={this.reserveSlots}>
              <span>Reserve </span><i className="fa fa-headphones"></i>
          </button>;
      }
    };
    return (
      <li className="item">
        <div className="clearfix">
          <div className="pull-left">
            <h4 className="item-heading display-ib">{this.props.course.name}</h4>
            <ul className="l-h-list display-ib guru-audience-list">
              {audience}
            </ul>
            <div>
              <h5 className="text-charcoal">Sessions: <strong>{this.props.course.classes}</strong>
              | Fee :  <strong><i className="fa fa-rupee"></i> {this.props.course.fee}</strong>
              </h5>
            </div>
          </div>
          <div className="pull-right">
          {reserveBtn.call(this)}
          </div>
        </div>
        {modal}
      </li>
    );
  }
});

Courses = React.createClass({
  mixins: [UserHelpers],
  getInitialState: function() {
    return {
      courses: []
    };
  },
  componentWillMount: function() {
    return $.getJSON('/api/public/courses', {
      username: this.getUserName()
    }, (function(_this) {
      return function(coursesRes) {
        return _this.setState({
          courses: coursesRes
        });
      };
    })(this));
  },
  render: function() {
    var courses;
    courses = this.state.courses.map(function(course) {
      return Course({
        course: course
      });
    });
    return (
    <div className="schedule-container">
      <h4 className="text-heading">Learn</h4>
      <ul className="list-guru-courses list-unstyled">
      {courses}
      </ul>
    </div>
    );
  }
});

Youtube = React.createClass({
  mixins: [UserHelpers],
  getInitialState: function() {
    return {
      youtube: []
    };
  },
  componentWillMount: function() {
    var username;
    username = this.getUserName();
    return $.getJSON('/api/public/youtube', {
      username: username
    }, (function(_this) {
      return function(youTubeRes) {
        return _this.setState({
          youtube: youTubeRes
        });
      };
    })(this));
  },
  componentDidUpdate: function() {
    var videoArray;
    videoArray = this.state.youtube.map(function(youtubeItem) {
      if (youtubeItem.enabled) {
        return {
          title: youtubeItem.title,
          href: "http://www.youtube.com/watch?v=" + youtubeItem.videoId,
          type: 'text/html',
          youtube: youtubeItem.videoId,
          poster: "https://img.youtube.com/vi/" + youtubeItem.videoId + "/0.jpg"
        };
      } else {
        return false;
      }
    });
    videoArray = _.reject(videoArray, function(videoItem) {
      return !videoItem;
    });
    return blueimp.Gallery(videoArray, {
      container: '#blueimp-video-carousel',
      carousel: true
    });
  },
  render: function() {
    return (
    <div>
    <h3 className="text-heading text-center mb-30">On Youtube</h3>
      <div id="blueimp-video-carousel" className="blueimp-gallery blueimp-gallery-controls blueimp-gallery-carousel">
        <div className="slides"></div>
        <h3 className="title"></h3>
        <a className="prev">‹</a>
        <a className="next">›</a>
        <a className="play-pause"></a>
      </div>
    </div>
  );
  }
});

SoundCloud = React.createClass({
  mixins: [UserHelpers],
  getInitialState: function() {
    return {
      soundcloud: {
        connected: false,
        permalink_url: '',
        is_shown: false
      }
    };
  },
  render: function() {
    return (
      <div>
        <h3 className="text-heading text-center mb-30">On SoundCloud</h3>
        <div id="embedSoundCloudWidget"></div>
      </div>
    );
  },
  componentWillMount: function() {
    var username;
    username = this.getUserName();
    return $.getJSON('/api/public/soundcloud', {
      username: username
    }, (function(_this) {
      return function(soundCloudRes) {
        return _this.setState({
          soundcloud: soundCloudRes
        });
      };
    })(this));
  },
  componentDidUpdate: function() {
    var container;
    container = $(this.getDOMNode()).find('#embedSoundCloudWidget');
    if (this.state.soundcloud.connected) {
      return SC.oEmbed("https://soundcloud.com/mad-orange-fireworks", function(embed) {
        return container.html(embed.html);
      });
    }
  }
});

React.renderComponent(SoundCloud({}), document.getElementById('widget-soundcloud'));

React.renderComponent(Youtube({}), document.getElementById('widget-youtube'));

React.renderComponent(Courses({}), document.getElementById('widget-courses'));

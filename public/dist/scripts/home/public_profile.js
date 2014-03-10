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
      React.DOM.a( {role:"button", className:"btn"}, 
        this.props.children
      )
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
      BootstrapButton(
        {onClick:this.handleConfirm,
        className:"btn-primary"}, 
        this.props.confirm
      );
    }
    if (this.props.cancel) {
      cancelButton = 
      BootstrapButton(
        {onClick:this.handleCancel}, 
        this.props.cancel
      );
    }
    return (
      React.DOM.div( {className:"modal fade"}, 
        React.DOM.div( {className:"modal-dialog modal-md"}, 
          React.DOM.div( {className:"modal-content"}, 
            React.DOM.div( {className:"modal-header"}, 
              React.DOM.h3( {className:"m-0"}, this.props.title)
            ),
            React.DOM.div( {className:"modal-body",  id:this.props.id}
            ),
            React.DOM.div( {className:"modal-footer"}, 
              cancelButton,
              confirmButton
            )
          )
        )
      )
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
      React.DOM.div(null, 
        React.DOM.h5(null, 
          " Selected ",
          React.DOM.span( {className:"schedule-classes"}, this.props.reserved.length),
          " of ",
          this.props.classes
        ),
        React.DOM.div( {className:"schedule-calendar"})
      )
      );
  }
});

Course = React.createClass({
  getInitialState: function() {
    return {
      reservedSlots: []
    };
  },
  reserveSlots: function() {
    $(this.getDOMNode()).find('.has-action').toggleClass('btn-primary btn-warning').find('span').html('Reserving.. ');
    return this.refs.modal.open();
  },
  handleCancel: function() {
    $(this.getDOMNode()).find('.has-action').toggleClass('btn-primary btn-warning').find('span').html('Reserve ');
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
    return console.log(this.state.reservedSlots);
  },
  render: function() {
    var audience, audienceItemDOM, modal, modalTitle;
    this.modalId = "modal_" + this.props.course._id;
    modalTitle = "Reserve slots - " + this.props.course.name;
    modal = BootstrapModal(
      {ref:  "modal",
      confirm:  "Done",
      cancel:  "Go back",
      onConfirm:  this.handleConfirm,
      onCancel:  this.handleCancel,
      onShown:  this.handleModalShown,
      title:  modalTitle,
      id:  this.modalId}
      );
    audienceItemDOM = function(id) {
      if (id === "beg") {
        return (React.DOM.span( {className:"audience-item beg", title:"Level: Beginner"}, "B"));
      } else if (id === "inter") {
        return (React.DOM.span( {className:"audience-item inter", title:"Level: Intermediate"}, "I"));
      } else {
        return (React.DOM.span( {className:"audience-item adv", title:"Level: Advanced"}, "A"));
      }
    };
    audience = this.props.course.target_audience.map((function(_this) {
      return function(audienceItem) {
        if (audienceItem.selected) {
          return (
        React.DOM.li( {className:"item"}, 
        audienceItemDOM(audienceItem.id)
        )
    );
        }
      };
    })(this));
    return (
      React.DOM.li( {className:"item"}, 
        React.DOM.div( {className:"clearfix"}, 
          React.DOM.div( {className:"pull-left"}, 
            React.DOM.h4( {className:"item-heading display-ib"}, this.props.course.name),
            React.DOM.ul( {className:"l-h-list display-ib guru-audience-list"}, 
              audience
            ),
            React.DOM.div(null, 
              React.DOM.h5( {className:"text-charcoal"}, "Sessions: ", React.DOM.strong(null, this.props.course.classes),
              " | Fee : ",  React.DOM.strong(null, React.DOM.i( {className:"fa fa-rupee"}), this.props.course.fee)
              )
            )
          ),
          React.DOM.div( {className:"pull-right"}, 
            React.DOM.button( {ref:"reserveBtn", className:"btn btn-primary has-action", onClick:this.reserveSlots}, 
              React.DOM.span(null, "Reserve " ),React.DOM.i( {className:"fa fa-headphones"})
            )
          )
        ),
        modal
      )
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
    React.DOM.div( {className:"schedule-container"}, 
      React.DOM.h4( {className:"text-heading"}, "Learn"),
      React.DOM.ul( {className:"list-guru-courses list-unstyled"}, 
      courses
      )
    )
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
    React.DOM.div(null, 
    React.DOM.h3( {className:"text-heading text-center mb-30"}, "On Youtube"),
      React.DOM.div( {id:"blueimp-video-carousel", className:"blueimp-gallery blueimp-gallery-controls blueimp-gallery-carousel"}, 
        React.DOM.div( {className:"slides"}),
        React.DOM.h3( {className:"title"}),
        React.DOM.a( {className:"prev"}, "‹"),
        React.DOM.a( {className:"next"}, "›"),
        React.DOM.a( {className:"play-pause"})
      )
    )
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
      React.DOM.div(null, 
        React.DOM.h3( {className:"text-heading text-center mb-30"}, "On SoundCloud"),
        React.DOM.div( {id:"embedSoundCloudWidget"})
      )
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

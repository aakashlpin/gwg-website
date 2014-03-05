/*** @jsx React.DOM */;
var Course, Courses, Schedule, SoundCloud, UserHelpers, Youtube;

UserHelpers = {
  getUserName: function() {
    return window.location.pathname.split('/')[1];
  }
};

Course = React.createClass({
  render: function() {
    var audience, audienceItemDOM;
    audienceItemDOM = function(id) {
      if (id === "beg") {
        return (React.DOM.span( {className:"audience-item beg"}, "B"));
      } else if (id === "inter") {
        return (React.DOM.span( {className:"audience-item inter"}, "I"));
      } else {
        return (React.DOM.span( {className:"audience-item adv"}, "A"));
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
        React.DOM.h4( {className:"text-charcoal item-heading display-ib"}, this.props.course.name),
        React.DOM.ul( {className:"l-h-list display-ib guru-audience-list"}, 
        audience
        )
        ),
        React.DOM.div( {className:"pull-right"}, 
          React.DOM.button( {className:"btn btn-primary"} , "Reserve")
        )
      )
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
      React.DOM.h4( {className:"text-heading"}, "Now Teaching"),
      React.DOM.ul( {className:"list-guru-courses list-unstyled"}, 
      courses
      )
    )
    );
  }
});

Schedule = React.createClass({
  mixins: [UserHelpers],
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
    return $(this.getDOMNode()).find('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }
    }, {
      defaultView: 'agendaWeek',
      editable: false,
      events: this.state.slots,
      eventClick: function(e) {
        return console.log(e);
      }
    });
  },
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h4( {className:"text-heading"}, "Available Slots"),
        React.DOM.div( {className:"schedule-container", id:"calendar"})
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
    React.DOM.h4( {className:"text-heading"}, "On Youtube"),
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
        React.DOM.h4( {className:"text-heading"}, "On SoundCloud"),
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
      return SC.oEmbed(this.state.soundcloud.permalink_url, function(embed) {
        return container.html(embed.html);
      });
    }
  }
});

React.renderComponent(SoundCloud({}), document.getElementById('widget-soundcloud'));

React.renderComponent(Youtube({}), document.getElementById('widget-youtube'));

React.renderComponent(Courses({}), document.getElementById('widget-courses'));

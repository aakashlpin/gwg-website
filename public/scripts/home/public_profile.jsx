/*** @jsx React.DOM */;
var Course, Courses, Schedule, SoundCloud, UserHelpers, Youtube;

UserHelpers = {
  getUserName: function() {
    return window.location.pathname.split('/')[1];
  }
};

Course = React.createClass({
  render: function() {
    var audience;
    audience = this.props.course.target_audience.map(function(audienceItem) {
      if (audienceItem.selected) {
        return (
          <li className="item">
          {audienceItem.name}
          </li>
        );
      }
    });
    return (
    <li className="item">
      <div className="clearfix">
        <div className="pull-left">
        <h4 className="text-charcoal item-heading">{this.props.course.name}</h4>
        <ul className="l-h-list">
        {audience}
        </ul>
        </div>
        <div className="pull-right">
          <button className="btn btn-primary" >Reserve</button>
        </div>
      </div>
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
      <h4 className="text-heading">Now Teaching</h4>
      <ul className="list-guru-courses list-unstyled">
      {courses}
      </ul>
    </div>
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
      <div>
        <h4 className="text-heading">Available Slots</h4>
        <div className="schedule-container" id="calendar"></div>
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
    <h4 className="text-heading">On Youtube</h4>
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
        <h4 className="text-heading">On SoundCloud</h4>
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
      return SC.oEmbed(this.state.soundcloud.permalink_url, function(embed) {
        return container.html(embed.html);
      });
    }
  }
});

React.renderComponent(SoundCloud({}), document.getElementById('widget-soundcloud'));

React.renderComponent(Youtube({}), document.getElementById('widget-youtube'));

React.renderComponent(Courses({}), document.getElementById('widget-courses'));
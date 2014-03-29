/*** @jsx React.DOM */

SC.initialize({
    client_id: "e63a38724fcd2b664ca141aeb20e6fd0",
    redirect_uri: "http://guitarwith.guru/auth/soundcloud/callback.html"
});

/***
 *
 *
 * Loading Component
 */

var Loading = React.createClass({displayName: 'Loading',
    render: function() {
        return (
            React.DOM.div( {className:"loader"}, 
                React.DOM.div( {className:"loader-inner"}, 
                    React.DOM.img( {src:"/images/loader.gif", alt:"Just a moment.."} )
                )
            )
            )
    }
});

/**
 *
 *
 * SoundCloud Component
 */

var SoundCloudComponent = React.createClass({displayName: 'SoundCloudComponent',
    getInitialState: function() {
        return {
            soundcloud: {
                connected: false,
                permalink_url: '',
                is_shown: false
            },
            fetched: false,
            user: {}
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/soundcloud', function(res) {
            this.setState({
                fetched: true
            });
            if (!res || (res && !res.soundcloud)) return;

            this.setState({
                soundcloud: res.soundcloud
            });
            this.embedSoundCloudWidget();

        }.bind(this));

        $.getJSON('/api/guru/user', function(user) {
            if (!user) return;
            this.setState({user: user});

            mixpanel.identify(user.email);
            mixpanel.people.set({
                "$email": user.email,
                "$name": user.name,
                "$last_login": new Date()
            });

            mixpanel.track('Visited Apps page');

        }.bind(this));

    },
    sync: function() {
        $.post('/api/guru/soundcloud', {soundcloud: this.state.soundcloud}, function(res) {
            this.embedSoundCloudWidget();
        }.bind(this));
    },
    handleConnectWithSoundCloud: function() {
        SC.connect(function(){
            SC.get('/me', function(user) {
                this.setState({
                    soundcloud: {
                        connected: true,
                        permalink_url: user.permalink_url,
                        is_shown: true
                    }
                });

                this.sync();

                mixpanel.track('Connected SoundCloud');

            }.bind(this));
        }.bind(this));

    },
    handleDisConnectFromSoundCloud: function() {
        this.state.soundcloud.connected = false;
        this.setState({
            soundcloud: this.state.soundcloud
        });
        this.sync();
        mixpanel.track('DisConnected SoundCloud');
    },
    loadDOM: function() {
        if (this.state.fetched) {
            if (this.state.soundcloud.connected) {
                return (
                    React.DOM.div(null, 
                        React.DOM.p( {className:"gwg-callout gwg-callout-info text-light"}, 
                        " Awesome! This SoundCloud widget will now be shown in your profile. ",
                            React.DOM.a( {id:"disconnect", className:"pull-right mt--4", onClick:this.handleDisConnectFromSoundCloud}, 
                                React.DOM.img( {src:"/images/btn-disconnect-l.png", alt:"Disconnect from SoundCloud"})
                            )
                        )
                    )
                    )
            } else {
                return (
                    React.DOM.div(null, 
                        React.DOM.p( {className:"gwg-callout gwg-callout-info text-light"}, 
                        " Connect with SoundCloud to share your public music on your Guitar with Guru profile. "
                        ),
                        React.DOM.a( {id:"connect", onClick:this.handleConnectWithSoundCloud}, 
                            React.DOM.img( {src:"/images/btn-connect-sc-l.png", alt:"Connect with SoundCloud"})
                        )
                    )
                    )
            }
        } else {
            return (
                Loading(null)
                )
        }
    },
    embedSoundCloudWidget: function() {
        var container = $(this.getDOMNode()).find('#embedSoundCloudWidget');
        if (this.state.soundcloud.connected) {
            SC.oEmbed(this.state.soundcloud.permalink_url, function(embed) {
                container.html(embed.html);
            }.bind(this));

        } else {
            container.empty();
        }
    },
    componentDidMount: function() {
        this.embedSoundCloudWidget();
    },
    render: function() {
        return (
            React.DOM.div( {className:"mb-60"}, 
                React.DOM.h3(null, "SoundCloud ",
                    React.DOM.a( {href:"http://soundcloud.com", target:"_blank"}, React.DOM.i( {className:"fa fa-external-link"}))
                ),
            this.loadDOM(),
                React.DOM.div( {id:"embedSoundCloudWidget"}
                )
            )
            );
    }
});

/*****
 *
 *
 *
 * Youtube component
 */

var YoutubeComponent = React.createClass({displayName: 'YoutubeComponent',
    getInitialState: function() {
        return {
            videos: [],
            fetched: false,
            authorized: true,
            revoked: false
        };
    },
    componentWillMount: function() {
        //make a call to server to fetch existing videos
        $.getJSON('/api/guru/youtube', function(res) {
            if (!res || (res && !res.youtube)) {
                return;
            }

            this.setState({
                videos: res.youtube
            });

        }.bind(this));

        //initiate Google OAuth2 to check for videos again.
        //We might want to have highlight the newer videos
        this.callbackName = "youtube" + Math.floor(Math.random() * 1000000);
        //create a random global for the library to be able to call it
        window[this.callbackName] = this.handleGPlusClientLoad;
        $.ajax({
            url: function(){
                return 'https://apis.google.com/js/client.js?onload=' + this.callbackName
            }.call(this),
            crossDomain: true,
            dataType: 'script'
        });

    },
    sync: function() {
        $.post('/api/guru/youtube', {youtube: this.state.videos}, function(res) {
            mixpanel.track('Youtube app synced');
        });

    },
    handleGPlusClientLoad: function() {
        gapi.client.setApiKey(this.props.data.apiKey);
        this.checkAuth();

    },
    checkAuth: function() {
        gapi.auth.authorize({
            client_id: this.props.data.clientId,
            scope: this.props.data.scopes,
            immediate: true
        }, this.handleAuthResult.bind(this));

    },
    handleAuthResult: function(authResult) {
        if (authResult && !authResult.error) {
            this.makeApiCall();

        } else {
            //set authorized state to false
            this.setState({authorized: false});

            if (this.state.videos.length) {
                //access was granted earlier. videos were synced. then access was revoked.
                this.setState({revoked: true});
            }

            this.setState({fetched: true});
        }

    },
    getEnabledStatus: function(videoId) {
        var videoExists = _.find(this.state.videos, function(video) {
            return video.videoId === videoId;
        }, this);

        return (videoExists ? videoExists.enabled : true);

    },
    makeApiCall: function() {
        gapi.client.load('youtube', 'v3', function() {
            var request = gapi.client.youtube.channels.list({
                mine: true,
                part: 'contentDetails'
            });

            request.execute(function(response) {
                var playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;

                var request = gapi.client.youtube.playlistItems.list({
                    playlistId: playlistId,
                    part: 'snippet'
                });

                request.execute(function(response) {
                    // Go through response.result.playlistItems to view list of uploaded videos.
                    var videos = [], videoObject = {};
                    _.each(response.result.items, function(item){
                        videoObject = {
                            title: item.snippet.title,
                            description: item.snippet.description,
                            videoId: item.snippet.resourceId.videoId,
                            enabled: this.getEnabledStatus.call(this, item.snippet.resourceId.videoId)
                        };

                        videos.push(videoObject);
                    }, this);

                    this.setState({
                        videos: videos,
                        fetched: true
                    });

                    this.sync();

                }.bind(this));

            }.bind(this));

        }.bind(this));
    },
    bindGoogleCredsAndHandleAuthResult: function(authResults) {
        //put loader
        this.setState({
            fetched: false,
            authorized: true,
            revoked: false
        });

        //make api request to fetch user profile
        gapi.client.load('plus','v1', function(){
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.execute(function(peopleInfo) {
                var payload = {
                    email: peopleInfo.emails[0].value,
                    google: {
                        access_token: authResults.access_token
                    }
                };

                $.post('/api/guru/accounts', payload, function(){
                    this.handleAuthResult.call(this, authResults);
                }.bind(this));

            }.bind(this));
        }.bind(this));
    },
    handleAuthClick: function() {
        gapi.auth.authorize({
            client_id: this.props.data.clientId,
            scope: this.props.data.scopes,
            immediate: false
        }, this.bindGoogleCredsAndHandleAuthResult.bind(this));

        return false;

    },
    toggleStateFor: function(videoId) {
        var updatedVideosArray = this.state.videos.map(function(video) {
            if (video.videoId === videoId) {
                video.enabled = !video.enabled
            }
            return video;
        });

        this.setState({
            videos: updatedVideosArray
        });

        this.sync();
    },
    enableAllVideos: function() {
        this.setState({
            videos: this.state.videos.map(function(video) {
                video.enabled = true;
                return video;
            }, this)
        });

        this.sync();
    },
    disableAllVideos: function() {
        this.setState({
            videos: this.state.videos.map(function(video) {
                video.enabled = false;
                return video;
            }, this)
        });

        this.sync();

    },
    render: function() {
        var getSrc = function(videoId) {
            return 'http://i3.ytimg.com/vi/' + videoId + '/mqdefault.jpg';
        };

        var getHref = function(videoId) {
            return 'http://youtube.com/watch?v=' + videoId;
        };

        var getToggleButtonState = function(videoObject) {
            if (videoObject.enabled) {
                return (
                    React.DOM.button( {className:"btn btn-primary", onClick:this.toggleStateFor.bind(this, videoObject.videoId)}, 
                        React.DOM.i( {className:"fa fa-check-square-o"}), " Enabled "
                    )
                    )
            } else {
                return (
                    React.DOM.button( {className:"btn btn-default", onClick:this.toggleStateFor.bind(this, videoObject.videoId)}, 
                        React.DOM.i( {className:"fa fa-frown-o"}), " Disabled "
                    )
                    )

            }
        }.bind(this);

        var videosDOM = this.state.videos.map(function(video) {
            return (
                React.DOM.li( {className:"item bg-brand"}, 
                    React.DOM.div( {className:"media spacious"}, 
                        React.DOM.div( {className:"pull-left"}, 
                            React.DOM.a( {href:getHref(video.videoId), target:"_blank", className:"youtube-play"}, 
                                React.DOM.img( {className:"media-object", src:getSrc(video.videoId)} )
                            )
                        ),
                        React.DOM.div( {className:"media-body spacious"}, 
                            React.DOM.h4( {className:"media-heading"}, video.title),
                            React.DOM.p( {className:"text-light mb-20"}, video.description),
                            getToggleButtonState(video)
                        )
                    )
                )
                )


        });

        var enableAllAction = function() {
            var isAnyOneVideoDisabled = _.find(this.state.videos, function(video) {
                return !video.enabled;
            }, this);

            if (isAnyOneVideoDisabled) {
                return (
                    React.DOM.a( {className:"underline pull-right", onClick:this.enableAllVideos.bind(this)}, 
                    " Enable All Videos "
                    )
                    );

            } else {
                return ;
            }

        }.bind(this);

        var getAuthDOM = function() {
            if (this.state.authorized) return;

            if (this.state.revoked) {
                //when server returned a lengthy video list
                return (
                    React.DOM.div(null, 
                        React.DOM.p( {className:"gwg-callout gwg-callout-warning text-light"}, 
                        " It seems like you have revoked our access to your Google Account. "+
                        "We will continue to show the videos you enabled earlier. ",
                            React.DOM.a( {onClick:this.handleAuthClick.bind(this)}, 
                                React.DOM.img( {className:"wd-gplus", src:"/images/sign-in-with-google.png", alt:"login with Google"})
                            ),
                        " to update your account with new uploads. "+
                        "Alternatively, you can ",
                            React.DOM.a( {className:"underline", onClick:this.disableAllVideos.bind(this)}, "Disable All Videos"),". "
                        )
                    )
                    )
            } else {
                //when server returned an empty video list
                return (
                    React.DOM.div(null, 
                        React.DOM.p( {className:"gwg-callout gwg-callout-info text-light"}, 
                        " Connect your Google Account to fetch the videos you have uploaded on Youtube. "
                        ),

                        React.DOM.div( {class:"text-center"}, 
                            React.DOM.a( {onClick:this.handleAuthClick.bind(this)}, 
                                React.DOM.img( {className:"wd-gplus", src:"/images/sign-in-with-google.png", alt:"login with Google"})
                            )
                        )
                    )
                    )

            }

        }.bind(this);

        var getDOM = function() {
            if (!this.state.fetched) {
                return (Loading(null ));

            } else {
                if (this.state.videos.length) {
                    return (
                        React.DOM.div(null, 
                            React.DOM.p( {className:"gwg-callout gwg-callout-info text-light"}, 
                            " Videos marked as Enabled will be shown in your Guitar with Guru profile. ",
                            enableAllAction()
                            ),
                            React.DOM.ul( {className:"l-v-list list-unstyled"}, 
                                videosDOM
                            )
                        )
                        );
                } else {
                    if (this.state.authorized) {
                        return (
                            React.DOM.div(null, 
                                React.DOM.p( {className:"gwg-callout gwg-callout-info text-light"}, 
                                " Looks like you haven't uploaded any videos on Youtube. Never mind! "
                                )
                            )
                            )
                    } else {
                        return;
                    }
                }
            }
        }.bind(this);

        return (
            React.DOM.div( {className:"has-min-height"}, 
                React.DOM.h3(null, "Youtube ", React.DOM.a( {href:"http://youtube.com", target:"_blank"}, React.DOM.i( {className:"fa fa-external-link"}))),
                getAuthDOM(),
                getDOM()
            )
            );

    }
});

React.renderComponent(
    SoundCloudComponent(null ),
    document.getElementById('soundCloudAppManagement')
);

var youtubeData = {
    clientId: '1008229016606-s7fjods4mi2h1me6bdh9mapv8154lmem.apps.googleusercontent.com',
    apiKey: 'AIzaSyDdvmhjlHnK7rR2RaGy_1dVCbtDZ6Sr1fM',
    scopes: 'https://www.googleapis.com/auth/userinfo.email ' +
        'https://www.googleapis.com/auth/userinfo.profile ' +
        'https://www.googleapis.com/auth/youtube.readonly'
};

React.renderComponent(
    YoutubeComponent( {data:youtubeData} ),
    document.getElementById('youtubeAppManagement')
);
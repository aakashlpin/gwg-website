/*** @jsx React.DOM */

SC.initialize({
    client_id: "e63a38724fcd2b664ca141aeb20e6fd0",
    redirect_uri: "http://guitarwith.guru/auth/soundcloud/callback.html"
});

var SoundCloudComponent = React.createClass({
    getInitialState: function() {
        return {
            soundcloud: {
                connected: false,
                permalink_url: '',
                is_shown: false
            },
            fetched: false
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

            }.bind(this));
        }.bind(this));

    },
    handleDisConnectFromSoundCloud: function() {
        this.state.soundcloud.connected = false;
        this.setState({
            soundcloud: this.state.soundcloud
        });
        this.sync();
    },
    loadDOM: function() {
        if (this.state.fetched) {
            if (this.state.soundcloud.connected) {
                return (
                    <div>
                        <p className="gwg-callout gwg-callout-info text-light">
                        Awesome! This SoundCloud widget will now be shown in your profile.
                            <a id="disconnect" className="pull-right mt--4" onClick={this.handleDisConnectFromSoundCloud}>
                                <img src="/images/btn-disconnect-l.png" alt="Disconnect from SoundCloud"/>
                            </a>
                        </p>
                    </div>
                    )
            } else {
                return (
                    <div>
                        <p className="gwg-callout gwg-callout-info text-light">
                        Connect with SoundCloud to share your public music on your Guitar with Guru profile.
                        </p>
                        <a id="connect" onClick={this.handleConnectWithSoundCloud}>
                            <img src="/images/btn-connect-sc-l.png" alt="Connect with SoundCloud"/>
                        </a>
                    </div>
                    )
            }
        } else {
            return (
                <div className="loader">
                    <img src="/images/loader.gif" alt="Just a moment.." />
                </div>
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
            <div className="has-min-height">
            {this.loadDOM()}
                <div id="embedSoundCloudWidget">
                </div>
            </div>
            );
    }
});

var YoutubeComponent = React.createClass({
    getInitialState: function() {
        //TODO create a data model similar to the response from youtube.
        //TODO populate this data to populate UI 
        return {

        };
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
//    var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
//            authorizeButton.style.visibility = 'hidden';
            this.makeApiCall();
        } else {
            //TODO
//            authorizeButton.style.visibility = '';
//            authorizeButton.onclick = handleAuthClick;
        }

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

                });

            });

        });
    },
    handleAuthClick: function(event) {
        gapi.auth.authorize({
            client_id: this.props.data.clientId,
            scope: this.props.data.scopes,
            immediate: true
        }, this.handleAuthResult.bind(this));

        return false;

    },
    componentWillMount: function() {
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
    render: function() {
        return (
            <div className="has-min-height">
            </div>
            );

    }
});

React.renderComponent(
    <SoundCloudComponent />,
    document.getElementById('soundCloudAppManagement')
);

var youtubeData = {
    clientId: '1008229016606-s7fjods4mi2h1me6bdh9mapv8154lmem.apps.googleusercontent.com',
    apiKey: 'AIzaSyDdvmhjlHnK7rR2RaGy_1dVCbtDZ6Sr1fM',
    scopes: 'https://www.googleapis.com/auth/youtube.readonly'
};

React.renderComponent(
    <YoutubeComponent data={youtubeData} />,
    document.getElementById('youtubeAppManagement')
);


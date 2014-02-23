/*** @jsx React.DOM */

SC.initialize({
    client_id: "e63a38724fcd2b664ca141aeb20e6fd0",
    redirect_uri: "http://guitarwith.guru/auth/soundcloud/callback.html"
});

var SoundCloudComponent = React.createClass({displayName: 'SoundCloudComponent',
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
                React.DOM.div( {className:"loader"}, 
                    React.DOM.img( {src:"/images/loader.gif", alt:"Just a moment.."} )
                )
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
            React.DOM.div( {className:"has-min-height"}, 
            this.loadDOM(),
                React.DOM.div( {id:"embedSoundCloudWidget"}
                )
            )
            );
    }
});

React.renderComponent(
    SoundCloudComponent(null ),
    document.getElementById('appsManagement')
);
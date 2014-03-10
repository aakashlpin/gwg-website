/*** @jsx React.DOM */

var TextBoxComponent = React.createClass({displayName: 'TextBoxComponent',
    handleChangeInTextBox: function(itemKey, e) {
        this.props.itemValue.value = e.target.value;
        this.props.handleStateChange(itemKey, this.props.itemValue);

    },
    _getLabelForItem: function(stateForItem) {
        return stateForItem.name;

    },
    _getFormElement: function(itemKey, stateForItem) {
        if (stateForItem.formElement == 'input') {
            return (
                React.DOM.input(
                {className:"form-control",
                name:itemKey,
                id:itemKey,
                value:stateForItem.value,
                onChange:this.handleChangeInTextBox.bind(this, itemKey),
                placeholder:stateForItem.placeholder}
                )
                )
        } else {
            return (
                React.DOM.textarea(
                {className:"form-control",
                name:itemKey,
                id:itemKey,
                value:stateForItem.value,
                onChange:this.handleChangeInTextBox.bind(this, itemKey),
                rows:"5",
                placeholder:stateForItem.placeholder}
                )
                )
        }
    },
    _getInput: function() {
        var itemKey = this.props.itemKey;
        var stateForItem = this.props.itemValue;
        return (
            React.DOM.div( {className:"form-group"}, 
                React.DOM.label( {className:"control-label col-sm-3", htmlFor:itemKey}, 
                this._getLabelForItem.call(this, stateForItem)
                ),
                React.DOM.div( {className:"col-sm-7"}, 
                this._getFormElement.call(this, itemKey, stateForItem)
                )
            )
            )

    },
    render: function() {
        return this._getInput();
    }
});


var ProfileManagement = React.createClass({displayName: 'ProfileManagement',
    getInitialState: function() {
        return {
            data: {
                about_me: {
                    name: 'About me',
                    value: '',
                    formElement: 'textarea',
                    placeholder: 'I am the lead guitarist and a songwriter in the heavy metal band Metallica ' +
                        'and have been a member of the band since 1983. ' +
                        'Before joining Metallica I formed and named the band Exodus.'
                },
                band_name: {
                    name: 'Name a band you have been associated with',
                    value: '',
                    formElement: 'input',
                    placeholder: 'Metallica'
                },
                links: {
                    name: 'List of links you would like to share (one per line)',
                    value: '',
                    formElement: 'textarea',
                    placeholder: 'http://www.mtv.com/artists/metallica'

                },
                phone: {
                    name: 'Phone number',
                    value: '',
                    formElement: 'input',
                    placeholder: '+91-9090898989'
                }
            },
            isDirty: true,
            user: {}
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/profile', function(data) {
            if (!data || (data && !data.extras)) return;

            var localData = _.extend({}, data.extras, {username: data.username});
            _.each(_.keys(localData), function(profileItem) {
                if (this.state.data[profileItem].formElement == "textarea") {
                    this.state.data[profileItem].value = localData[profileItem].join('\n');
                } else {
                    this.state.data[profileItem].value = localData[profileItem];
                }
            }, this);

            this.setState({data: this.state.data});
        }.bind(this));

        $.getJSON('/api/user', function(user) {
            if (!user) return;
            this.setState({user: user});

            mixpanel.identify(user.email);
            mixpanel.people.set({
                "$email": user.email,
                "$name": user.name,
                "$last_login": new Date()
            });

            mixpanel.track('Visited Profile page');

        }.bind(this));

    },
    handleStateChange: function(itemKey, itemValue) {
        this.state.data[itemKey] = itemValue;
        this.setState({
            data: this.state.data,
            isDirty: true
        });

    },
    _getFormComponents: function() {
        return _.keys(this.state.data).map(function(itemKey) {
            return TextBoxComponent( {itemKey:itemKey, itemValue:this.state.data[itemKey],
            handleStateChange:this.handleStateChange})

        }, this);

    },
    handleProfileFormSubmit: function(e) {
        e.preventDefault();
        var payload = {},
            clonedCopyOfState = $.extend(true, {}, this.state.data);
        //create this cloned copy so that original state does not get affected
        //
        _.each(_.keys(clonedCopyOfState), function(profileItem){
            var profileItemValue = clonedCopyOfState[profileItem];
            if (profileItemValue.formElement == 'textarea') {
                profileItemValue.value = profileItemValue.value.split('\n');
            }
            payload[profileItem] = profileItemValue.value;

        }, this);

        $.post('/api/guru/profile', {extras: payload}, function(res) {
            if (res) {
                this.setState({isDirty: false});
            }
        }.bind(this));

        mixpanel.track('Profile changed and saved');
    },
    getSubmitButtonType: function() {
        if (this.state.isDirty) {
            return (
                React.DOM.button( {type:"submit", className:"btn btn-success"}, "Save")
                )
        }
        return (
            React.DOM.button( {type:"submit", className:"btn btn-primary"}, "Saved")
            )
    },
    render: function() {
        return (
            React.DOM.div( {className:"has-min-height"}, 
                React.DOM.h3(null, "Profile"),
                React.DOM.p( {className:"gwg-callout gwg-callout-info text-light"}, 
                " * Tell us a bit about yourself. This will help us feature you on our homepage. "
                ),

                React.DOM.p( {className:"gwg-callout gwg-callout-warning text-light"}, 
                    React.DOM.strong(null, "New: " ),
                " Share your music with the world! Import your ",
                    React.DOM.a( {className:"underline", href:"/g/apps"}, "Youtube videos"),
                " and ",
                    React.DOM.a( {className:"underline", href:"/g/apps"}, "SoundCloud songs"),
                " into your profile. "
                ),

                React.DOM.div( {className:"pad-10"}, 
                    React.DOM.form( {className:"form-horizontal", role:"form", onSubmit:this.handleProfileFormSubmit}, 
                    this._getFormComponents(),
                        React.DOM.div( {className:"form-group"}, 
                            React.DOM.div( {className:"col-sm-offset-3 col-sm-9"}, 
                            this.getSubmitButtonType.call(this)
                            )
                        )
                    )
                )
            )
            )
    }
});

React.renderComponent(
    ProfileManagement(null ),
    document.getElementById('profileManagement')
);
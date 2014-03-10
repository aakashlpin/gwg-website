/*** @jsx React.DOM */

var TextBoxComponent = React.createClass({
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
                <input
                className="form-control"
                name={itemKey}
                id={itemKey}
                value={stateForItem.value}
                onChange={this.handleChangeInTextBox.bind(this, itemKey)}
                placeholder={stateForItem.placeholder}
                />
                )
        } else {
            return (
                <textarea
                className="form-control"
                name={itemKey}
                id={itemKey}
                value={stateForItem.value}
                onChange={this.handleChangeInTextBox.bind(this, itemKey)}
                rows="5"
                placeholder={stateForItem.placeholder}
                />
                )
        }
    },
    _getInput: function() {
        var itemKey = this.props.itemKey;
        var stateForItem = this.props.itemValue;
        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={itemKey}>
                {this._getLabelForItem.call(this, stateForItem)}
                </label>
                <div className="col-sm-7">
                {this._getFormElement.call(this, itemKey, stateForItem)}
                </div>
            </div>
            )

    },
    render: function() {
        return this._getInput();
    }
});


var ProfileManagement = React.createClass({
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
            return <TextBoxComponent itemKey={itemKey} itemValue={this.state.data[itemKey]}
            handleStateChange={this.handleStateChange}/>

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
                <button type="submit" className="btn btn-success">Save</button>
                )
        }
        return (
            <button type="submit" className="btn btn-primary">Saved</button>
            )
    },
    render: function() {
        return (
            <div className="has-min-height">
                <h3>Profile</h3>
                <p className="gwg-callout gwg-callout-info text-light">
                * Tell us a bit about yourself. This will help us feature you on our homepage.
                </p>

                <p className="gwg-callout gwg-callout-warning text-light">
                    <strong>New: </strong>
                Share your music with the world! Import your
                    <a className="underline" href="/g/apps">Youtube videos</a>
                and
                    <a className="underline" href="/g/apps">SoundCloud songs</a>
                into your profile.
                </p>

                <div className="pad-10">
                    <form className="form-horizontal" role="form" onSubmit={this.handleProfileFormSubmit}>
                    {this._getFormComponents()}
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-9">
                            {this.getSubmitButtonType.call(this)}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            )
    }
});

React.renderComponent(
    <ProfileManagement />,
    document.getElementById('profileManagement')
);
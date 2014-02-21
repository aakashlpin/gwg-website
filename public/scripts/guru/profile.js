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

            }
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/profile', function(data) {
            if (!data || (data && !data.extras)) return;

            data = data.extras;
            _.each(_.keys(data), function(profileItem) {
                if (this.state[profileItem].formElement == "textarea") {
                    this.state[profileItem].value = data[profileItem].join('\n');
                } else {
                    this.state[profileItem].value = data[profileItem];
                }
            }, this);

            this.setState(this.state);
        }.bind(this));
    },
    handleStateChange: function(itemKey, itemValue) {
        var setStateObject = {};
        setStateObject[itemKey] = itemValue;
        this.setState(setStateObject);

    },
    _getFormComponents: function() {
        return _.keys(this.state).map(function(itemKey) {
            return <TextBoxComponent itemKey={itemKey} itemValue={this.state[itemKey]}
            handleStateChange={this.handleStateChange}/>

        }, this);

    },
    handleProfileFormSubmit: function(e) {
        e.preventDefault();
        var payload = {};
        _.each(_.keys(this.state), function(profileItem){
            var profileItemValue = this.state[profileItem];
            if (profileItemValue.formElement == 'textarea') {
                profileItemValue.value = profileItemValue.value.split('\n');
            }
            payload[profileItem] = profileItemValue.value;

        }, this);

        $.post('/api/guru/profile', {extras: payload}, function(res) {
            if (res) {
                $(this.getDOMNode()).find('[type="submit"]')
                    .toggleClass('btn-success btn-primary').html('Saved');
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div className="pad-10">
                <form className="form-horizontal" role="form" onSubmit={this.handleProfileFormSubmit}>
                {this._getFormComponents()}
                    <div className="clearfix">
                        <button type="submit" className="btn btn-success pull-right">Save</button>
                    </div>
                </form>
            </div>
            )
    }
});

React.renderComponent(
    <ProfileManagement />,
    document.getElementById('profileManagement')
);
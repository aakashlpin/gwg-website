/*** @jsx React.DOM */

var RadioGroupComponent = React.createClass({
    handleChange: function(itemKey, id) {
        this.props.itemValue.value = this.props.itemValue.value.map(function(radioItem) {
            return {
                id: radioItem.id,
                name: radioItem.name,
                selected: radioItem.id === id
            }
        }, this);

        this.props.handleStateChange(itemKey, this.props.itemValue);

    },
    render: function() {
        var itemKey = this.props.itemKey;
        var stateForItem = this.props.itemValue;
        var radioGroupDOM = stateForItem.value.map(function(radioItem) {
            return (
                <div className="radio">
                    <label>
                        <input
                        type="radio"
                        name={itemKey}
                        id={radioItem.id}
                        value={radioItem.id}
                        checked={radioItem.selected}
                        onChange={this.handleChange.bind(this, itemKey, radioItem.id)}
                        />
                    {radioItem.name}
                    </label>
                </div>
                )
        }, this);

        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={itemKey}>
                {stateForItem.name}
                </label>
                <div className="col-sm-7">
                {radioGroupDOM}
                </div>
            </div>
            )
    }
});

var TextBoxComponent = React.createClass({
    handleChangeInTextBox: function(itemKey, e) {
        this.props.itemValue.value = e.target.value;
        this.props.handleStateChange(itemKey, this.props.itemValue);

    },
    _getLabelForItem: function(stateForItem) {
        if (stateForItem.required) {
            return stateForItem.name
        } else {
            return stateForItem.name + ' (optional)'
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
                    <input
                    className="form-control"
                    name={itemKey}
                    id={itemKey}
                    value={stateForItem.value}
                    required={stateForItem.required}
                    onChange={this.handleChangeInTextBox.bind(this, itemKey)}
                    />
                </div>
            </div>
            )

    },
    render: function() {
        return this._getInput();
    }
});

var StaticComponent = React.createClass({
    render: function() {
        var itemKey = this.props.itemKey,
            stateForItem = this.props.itemValue;

        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={itemKey}>
                {stateForItem.name}
                </label>
                <div className="col-sm-7">
                    <p className="form-control-static">
                        {stateForItem.value}
                    </p>
                </div>
            </div>
            )
    }
});

var BankManagement = React.createClass({
    getInitialState: function() {
        return {
            country: {
                name: 'Country',
                required: true,
                value: 'India'
            },
            mode_of_payment: {
                name: 'Mode of Payment',
                required: true,
                value: [{
                    id: 'online',
                    name: 'Net Banking',
                    selected: true
                }, {
                    id: 'cheque',
                    name: 'Cheque',
                    selected: false
                }]
            },
            beneficiary_name: {
                name: 'Beneficiary Name',
                required: true,
                value: ''
            },
            account_number: {
                name: 'Account Number',
                required: true,
                value: ''
            },
            bank_name: {
                name: 'Bank Name',
                required: true,
                value: ''
            },
            bank_branch: {
                name: 'Bank Branch',
                required: true,
                value: ''
            },
            bank_address: {
                name: 'Bank Address',
                required: true,
                value: ''
            },
            ifsc_code: {
                name: 'IFSC Code',
                required: true,
                value: ''
            },
            pan_number: {
                name: 'PAN Number',
                required: false,
                value: ''
            }
        }
    },
    componentWillMount: function() {
        $.getJSON('/api/guru/bank', function(data) {
            _.each(_.keys(data), function(bankItem) {
                if (bankItem === 'mode_of_payment') {
                    this.state[bankItem].value = _.map(this.state[bankItem].value, function(paymentItem) {
                        paymentItem.selected = (paymentItem.id === data[bankItem]);
                        return paymentItem;
                    }, this);

                } else {
                    if (this.state[bankItem]) {
                        this.state[bankItem].value = data[bankItem];
                    }
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
            switch (itemKey) {
                case 'mode_of_payment':
                    return <RadioGroupComponent itemKey={itemKey} itemValue={this.state[itemKey]}
                    handleStateChange={this.handleStateChange} />
                    break;
                case 'country':
                    return <StaticComponent itemKey={itemKey} itemValue={this.state[itemKey]} />
                    break;

                default:
                    return <TextBoxComponent itemKey={itemKey} itemValue={this.state[itemKey]}
                    handleStateChange={this.handleStateChange} />
            }

        }, this);

    },
    handleNewCourseFormSubmit: function(e) {
        e.preventDefault();
        var payload = {};
        _.each(_.keys(this.state), function(bankItem) {
            if (bankItem === 'mode_of_payment') {
                payload[bankItem] = _.find(this.state[bankItem].value, function(val){ return val.selected }).id;
            } else {
                payload[bankItem] = this.state[bankItem].value;
            }
        }, this);

        $.post('/api/guru/bank', payload, function(res) {
            if (res) {
                $(this.getDOMNode()).find('[type="submit"]')
                    .toggleClass('btn-success btn-primary').html('Saved');

            }
        }.bind(this));
    },
    render: function() {
        return (
            <div className="pad-10">
                <h4>Bank Details</h4>
                <form className="form-horizontal" role="form" onSubmit={this.handleNewCourseFormSubmit}>
                {this._getFormComponents()}
                    <div className="clearfix">
                        <button type="submit" className="btn btn-success pull-right">Save</button>
                    </div>
                </form>
            </div>
            );
    }
});

React.renderComponent(
    <BankManagement />,
    document.getElementById('bankManagement')
);
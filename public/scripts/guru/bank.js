/*** @jsx React.DOM */

var RadioGroupComponent = React.createClass({
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
                        />
                    {radioItem.name}
                    </label>
                </div>
                )
        });

        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={itemKey}>{stateForItem.name}</label>
                <div className="col-sm-7">
                {radioGroupDOM}
                </div>
            </div>
            )
    }
});

var TextBoxComponent = React.createClass({
    handleChangeInTextBox: function(itemKey) {

    },
    _getInputWithRequired: function() {
        var itemKey = this.props.itemKey;
        var stateForItem = this.props.itemValue;
        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={itemKey}>{stateForItem.name}</label>
                <div className="col-sm-7">
                    <input
                    className="form-control"
                    name={itemKey}
                    id={itemKey}
                    required="required"
                    value={stateForItem.value}
                    onChange={this.handleChangeInTextBox.bind(this, itemKey)}
                    />
                </div>
            </div>
            )

    },
    _getInputWithoutRequired: function() {
        var itemKey = this.props.itemKey;
        var stateForItem = this.props.itemValue;
        return (
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor={itemKey}>{stateForItem.name}</label>
                <div className="col-sm-7">
                    <input
                    className="form-control"
                    name={itemKey}
                    id={itemKey}
                    value={stateForItem.value}
                    onChange={this.handleChangeInTextBox.bind(this, itemKey)}
                    />
                </div>
            </div>
            )

    },
    render: function() {
        var stateForItem = this.props.itemValue;
        if (stateForItem.required) {
            return this._getInputWithRequired();
        } else {
            return this._getInputWithoutRequired();
        }
    }
});

var BankManagement = React.createClass({
    getInitialState: function() {
        return {
            country: {
                name: 'Country',
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
                required: false,
                value: ''
            },
            account_number: {
                name: 'Account Name',
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
        //TODO fetch the bank data for this creator and preFill, if exists
    },
    _getFormComponents: function() {
        return _.keys(this.state).map(function(itemKey) {
            if (itemKey === 'mode_of_payment') {
                return <RadioGroupComponent itemKey={itemKey} itemValue={this.state[itemKey]} />
            } else {
                return <TextBoxComponent itemKey={itemKey} itemValue={this.state[itemKey]}/>
            }
        }, this);

    },
    handleNewCourseFormSubmit: function() {

    },
    render: function() {
        return (
            <div className="pad-10">
                <h4>Bank Details</h4>
                <form className="form-horizontal" role="form" onSubmit={this.handleNewCourseFormSubmit}>
                {this._getFormComponents()}
                </form>
            </div>
            );
    }
});

React.renderComponent(
    <BankManagement />,
    document.getElementById('bankManagement')
);
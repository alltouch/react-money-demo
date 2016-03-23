import React from 'react';

import CurrencySelect from '../currency-select.jsx';

export default class AccountLine extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            editMode: false
        };
    }

    render(){
        return (
            <tr>
                {this.renderName()}
                {this.renderAmount()}
                {this.renderCurrency()}
                {this.renderActions()}
            </tr>
        );
    }

    renderName(){
        let { account } = this.props;

        if(this.state.editMode){
            return (
                <td>
                    <input className="form-control" ref="name" defaultValue={account.name} />
                </td>
            );
        }
        return (
            <td>
                {account.name} &nbsp;
                <span className="label label-default">{account.tabName}</span>
            </td>
        );
    }

    renderAmount(){
        let { account } = this.props;

        if(this.state.editMode){
            return (
                <td>
                    <input className="form-control" ref="amount" defaultValue={account.amount} />
                </td>
            );
        }

        let amount = parseFloat(account.amount).toFixed(2);
        return (
            <td>
                {amount}
            </td>
        );
    }

    renderCurrency(){
        let { account } = this.props;

        if(this.state.editMode){
            return (
                <td>
                    <CurrencySelect ref="currency" defaultValue={account.currency} />
                </td>
            );
        }
        return (
            <td>
                {account.currency}
            </td>
        );
    }

    renderActions(){
        let {account, removeAccountAction, updateAccountAction } = this.props;

        if(account.name === 'Total'){
            return <td />;
        } else if(this.state.editMode) {
            let hideEditMode = () => {
                this.setState({
                    editMode: false
                });
            };

            let saveChanges = () => {
                let refs = this.refs;
                updateAccountAction(
                    account.id,
                    {
                        name: refs.name.value,
                        amount: refs.amount.value,
                        currency: refs.currency.refs.select.value
                    }
                );

                hideEditMode();
            };

            return (
                <td className="actions">
                    <span className="glyphicon glyphicon-ok" onClick={saveChanges} />
                    <span className="glyphicon glyphicon-remove" onClick={hideEditMode} />
                </td>
            );
        }

        let showEditMode = () => {
            this.setState({
                editMode: true
            });
        };

        let removeAccount = () => removeAccountAction(account.id);

        return (
            <td className="actions">
                <span className="glyphicon glyphicon-pencil" onClick={showEditMode} />
                <span className="glyphicon glyphicon-remove" onClick={removeAccount} />
            </td>
        );
    }
}

AccountLine.propTypes = {
    account: React.PropTypes.object,
    removeAccountAction: React.PropTypes.func,
    updateAccountAction: React.PropTypes.func
};

import React from 'react';

import Actions from '../../actions';

import CurrencySelect from '../common/currency-select.jsx';

export default React.createClass({
    getInitialState(){
        return {
            editMode: false
        };
    },
    removeAccount(){
        Actions.removeAccount(this.props.line);
    },
    showEditMode(){
        this.setState({
            editMode: true
        });
    },
    hideEditMode(){
        this.setState({
            editMode: false
        });
    },
    saveChanges(){
        Actions.updateAccount(
            this.props.line,
            {
                name: this.refs.name.value,
                amount: this.refs.amount.value,
                currency: this.refs.currency.refs.select.value
            }
        );

        this.hideEditMode();
    },
    render(){
        return (
            <tr>
                {this.renderName()}
                {this.renderAmount()}
                {this.renderCurrency()}
                {this.renderActions()}
            </tr>
        );
    },

    renderName(){
        var line = this.props.line;

        if(this.state.editMode){
            return (
                <td>
                    <input className="form-control" ref="name" defaultValue={line.name} />
                </td>
            );
        }
        return (
            <td>
                {line.name} &nbsp;
                <span className="label label-default">{line.tabName}</span>
            </td>
        );
    },

    renderAmount(){
        var line = this.props.line;

        if(this.state.editMode){
            return (
                <td>
                    <input className="form-control" ref="amount" defaultValue={line.amount} />
                </td>
            );
        }
        var amount = parseFloat(line.amount).toFixed(2);
        return (
            <td>
                {amount}
            </td>
        );
    },

    renderCurrency(){
        var line = this.props.line;
        if(this.state.editMode){
            return (
                <td>
                    <CurrencySelect ref="currency" defaultValue={line.currency} />
                </td>
            );
        }
        return (
            <td>
                {line.currency}
            </td>
        );
    },

    renderActions(){
        if(this.props.line.name === 'Total'){
            return <td/>;
        } else if(this.state.editMode) {
            return (
                <td className="actions">
                    <span className="glyphicon glyphicon-ok" onClick={this.saveChanges} />
                    <span className="glyphicon glyphicon-remove" onClick={this.hideEditMode} />
                </td>
            );
        }

        return (
            <td className="actions">
                <span className="glyphicon glyphicon-pencil" onClick={this.showEditMode} />
                <span className="glyphicon glyphicon-remove" onClick={this.removeAccount} />
            </td>
        );
    }
});

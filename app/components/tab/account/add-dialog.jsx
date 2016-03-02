import React from 'react';
import Immutable from 'immutable';

import Actions from '../../actions';

import CurrencySelect from '../common/currency-select.jsx';
import AccountModel from '../../../models/account';

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState(){
        var activeTab = parseInt(this.props.params.tabId || 0);
        if(!activeTab){
            this.closeDialog(0);
            return null;
        }

        return {
            model: new AccountModel({
                tabId: activeTab
            }),
            errors: Immutable.List()
        };
    },
    closeDialog(tabId){
        tabId = parseInt(tabId) || this.state.model.tabId;
        this.context.router.push({
            pathname: '/' + tabId
        });
    },
    saveAccount(){
        var model = this.state.model;
        var errors = this.state.errors.clear();

        if(model.name.length < 2){
            errors = errors.push('Account name is too small');
        }
        if(!model.currency){
            errors = errors.push('Choose currency');
        }
        if(Number.isNaN(parseFloat(model.amount))){
            errors = errors.push('Type correct number');
        }

        if(errors.size){
            this.setState({
                errors
            });
        } else {
            Actions.addAccount(model);
            this.closeDialog();
        }
    },
    updateModel(name, value){
        var model = this.state.model;
        this.setState({
            model: model.set(name, value)
        });
    },
    updateName(event){
        this.updateModel('name', event.target.value);
    },
    updateAmount(event){
        this.updateModel('amount', event.target.value);
    },
    updateCurrency(event){
        this.updateModel('currency', event.target.value);
    },
    componentDidMount(){
        this.refs.input.focus();
    },
    render(){
        var errors = this.state.errors;
        var model = this.state.model;
        var errorsList = '';
        if(errors.size){
            errorsList = (
                <div className="alert alert-danger">
                    {errors.map(error => <div>{error}</div>)}
                </div>
            );
        }
        return (
            <div className="modal fade in modal-opened">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button className="close" ><span>&times;</span></button>
                            <h4 className="modal-title">Add account</h4>
                        </div>
                        <div className="modal-body">
                            {errorsList}
                            <div className="form-group">
                                <label htmlFor="account-name" className="control-label">Name:</label>
                                <input className="form-control" id="account-name" value={model.name} onChange={this.updateName} ref="input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="currency" className="control-label">Currency:</label>
                                <CurrencySelect id="currency" value={model.currency} onChange={this.updateCurrency} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount" className="control-label">Amount:</label>
                                <input className="form-control" id="amount" value={model.amount} onChange={this.updateAmount} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-default" onClick={this.closeDialog}>Close</button>
                            <button className="btn btn-primary" onClick={this.saveAccount}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

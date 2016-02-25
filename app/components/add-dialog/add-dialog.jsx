import React from 'react';
import Actions from '../../actions';
import CurrencySelect from '../common/currency-select.jsx';

export default React.createClass({
    getInitialState(){
        return {
            model: {
                name: '',
                currency: '',
                amount: '0'
            },
            errors: []
        };
    },
    closeDialog(){
        Actions.hideAddDialog();
    },
    saveAccount(){
        var model = this.state.model;
        var errors = [];

        if(model.name.length < 2){
            errors.push('Account name is too small');
        }
        if(!model.currency){
            errors.push('Choose currency');
        }
        if(!model.amount){
            model.amount = '0';
        }
        if(Number.isNaN(parseFloat(model.amount))){
            errors.push('Type correct number');
        }

        if(errors.length){
            this.setState({
                errors
            });
        } else {
            Actions.addAccount(model);
        }
    },
    updateModel(name, value){
        var model = this.state.model;
        model[name] = value;
        this.setState({
            model
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
    render(){
        var errors = this.state.errors;
        var model = this.state.model;
        var errorsList = '';
        if(errors.length){
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
                                <input className="form-control" id="account-name" value={model.name} onChange={this.updateName} />
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

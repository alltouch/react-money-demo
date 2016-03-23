import React from 'react';
import { CURRENCIES, ALL_CURRENCY } from '../../config';

export default class CurrencyList extends React.Component{
    changeCurrency(name){
        return () => this.props.selectCurrencyAction(name);
    }
    render(){
        let currencies = [ALL_CURRENCY].concat(CURRENCIES);
        let selectedCurrency = this.props.selectedCurrency;

        return (
            <div className="btn-group">
                {currencies.map(currency => (
                    <button key={currency} onClick={this.changeCurrency(currency)}
                            className={'btn btn-default' + (currency === selectedCurrency ? 'active' : '')}
                    >{currency}</button>
                ))}
            </div>
        );
    }
}

CurrencyList.propTypes = {
    selectedCurrency: React.PropTypes.string,
    selectCurrencyAction: React.PropTypes.func
};

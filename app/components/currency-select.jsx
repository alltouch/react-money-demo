import React from 'react';
import { CURRENCIES } from '../config'

export default class CurrencySelect extends React.Component{
    render(){
        return (
            <select className="form-control" ref="select" {...this.props}>
                <option value="">choose currency</option>
                {CURRENCIES.map(curr =>
                    <option key={curr} value={curr}>{curr}</option>
                )}
            </select>
        );
    }
}

CurrencySelect.propTypes = {
    id: React.PropTypes.string,
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func
};

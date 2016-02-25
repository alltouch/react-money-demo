import React from 'react';
import Actions from '../../actions';

export default React.createClass({
    render(){
        var currencies = Actions.getState().currencies;

        return (
            <select className="form-control" id={this.props.id} value={this.props.value} onChange={this.props.onChange}>
                <option value="">choose currency</option>
                {currencies.map(curr =>
                    <option key={curr} value={curr}>{curr}</option>
                )}
            </select>
        );
    }
});

import React from 'react';
import Actions from '../../actions';

export default React.createClass({
    observes: ['currencies'],
    getInitialState(){
        return Actions.getData(this);
    },
    render(){
        var currencies = this.state.currencies;

        return (
            <select className="form-control"
                    id={this.props.id}
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    ref="select"
                    onChange={this.props.onChange}>
                <option value="">choose currency</option>
                {currencies.map(curr =>
                    <option key={curr} value={curr}>{curr}</option>
                )}
            </select>
        );
    }
});

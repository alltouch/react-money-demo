import React from 'react';

import Actions from '../actions';

export default React.createClass({
    propTypes: {
        currency: React.PropTypes.string
    },
    observes: ['currencies'],
    getInitialState(){
        return Actions.getData(this);
    },
    changeCurrency(currency){
        return () => Actions.setCurrency(currency);
    },
    render(){
        var currencies = ['All'].concat(this.state.currencies);

        return (
            <div className="btn-group">
                {currencies.map(currency => (
                    <button key={currency} onClick={this.changeCurrency(currency)}
                            className={'btn btn-default' + (currency === this.props.currency ? 'active' : '')}
                    >{currency}</button>
                ))}
            </div>
        );
    }
});

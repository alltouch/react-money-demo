import React from 'react';
import Actions from '../actions';

export default React.createClass({

    onClick(){
        Actions.onSelect(this.props.tab.key);
        //this.props.onChange(this.props.tab.key);
    },
    render(){
        var tab = this.props.tab;
        return (
            <li
                className={tab.active ? 'active' : ''}
                onClick={this.onClick}
            >{tab.name}</li>
        );
    }
});



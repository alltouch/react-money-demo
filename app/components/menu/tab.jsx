import React from 'react';

import Actions from '../../actions';

export default React.createClass({
    onClick(){
        Actions.selectTab(this.props.tab.key);
    },
    render(){
        var tab = this.props.tab;

        return (
            <li className={tab.active ? 'active' : ''}>
                <a onClick={this.onClick}>{tab.name}</a>
            </li>
        );
    }
});



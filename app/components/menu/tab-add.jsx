import React from 'react';

import Actions from '../../actions';

export default React.createClass({
    onClick(){
        Actions.createTab();
    },
    render(){
        return (
            <li>
                <a onClick={this.onClick}><span className="glyphicon glyphicon-plus" /></a>
            </li>
        );
    }
});



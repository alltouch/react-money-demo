import React from 'react';

import Actions from '../actions';

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    onClick(){
        var tabKey = Actions.createTab();
        this.context.router.push({
            pathname: '/' + tabKey
        });
    },
    render(){
        return (
            <li>
                <a onClick={this.onClick}><span className="glyphicon glyphicon-plus" /></a>
            </li>
        );
    }
});



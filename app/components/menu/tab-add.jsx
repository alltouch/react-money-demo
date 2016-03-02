import React from 'react';

import Actions from '../actions';

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    onClick(){
        var tab = Actions.createTab();
        this.context.router.push({
            pathname: tab.getUrl()
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

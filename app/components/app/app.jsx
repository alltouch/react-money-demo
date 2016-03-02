import React from 'react';

import './app.scss';
import Menu from '../menu/menu.jsx';

export default React.createClass({
    propTypes: {
        params: React.PropTypes.object,
        children: React.PropTypes.node
    },
    render(){
        var activeTab = parseInt(this.props.params.tabId, 10) || 0;

        return (
            <div>
                <Menu activeTab={activeTab} />

                {this.props.children}
            </div>
        );
    }
});

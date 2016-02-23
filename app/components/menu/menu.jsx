import React from 'react';

import './menu.scss';
import Tab from './tab.jsx';
import TabAdd from './tab-add.jsx';

export default React.createClass({

    render(){
        return (
            <ul className="nav nav-tabs main-menu">
                {this.props.tabs.map(tab =>
                    <Tab key={tab.key} tab={tab} />
                )}
                <TabAdd key="add"/>
            </ul>
        );
    }
});

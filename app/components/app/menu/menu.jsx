import React from 'react';

import './menu.scss';
import Tab from './tab.jsx';
import TabAdd from './tab-add.jsx';

export default class Menu extends React.Component{

    render(){
        let { tabs, activeTab, addTabAction, editTabAction } = this.props;

        return (
            <ul className="nav nav-tabs main-menu">
                {tabs.map(tab =>
                    <Tab key={tab.getKey()} tab={tab} activeTab={activeTab} editTabAction={editTabAction} />
                )}
                <TabAdd key="add" addTabAction={addTabAction} />
            </ul>
        );
    }
}

Menu.propTypes = {
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.object,
    addTabAction: React.PropTypes.func,
    editTabAction: React.PropTypes.func
};

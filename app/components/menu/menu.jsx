import React from 'react';
import Actions from '../actions';

import './menu.scss';
import Tab from './tab.jsx';
import TabAdd from './tab-add.jsx';

export default React.createClass({
    propTypes: {
        activeTab: React.PropTypes.number
    },
    observes: ['tabs'],
    getInitialState(){
        return Actions.getData(this);
    },
    componentWillMount(){
        Actions.addObserver(this);
    },
    componentWillUnmount(){
        Actions.removeObserver(this);
    },
    render(){
        return (
            <ul className="nav nav-tabs main-menu">
                {this.state.tabs.map(tab =>
                    <Tab key={tab.getKey()} tab={tab} activeTab={this.props.activeTab} />
                )}
                <TabAdd key="add" />
            </ul>
        );
    }
});

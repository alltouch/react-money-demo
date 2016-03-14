import React from 'react';
import { connect } from 'react-redux';

import './app.scss';
import { createTab, renameTab } from '../../actions/tabs';
import Menu from './menu/menu.jsx';

class AppContainer extends React.Component {
    render(){
        let activeTab = parseInt(this.props.params.tabId, 10) || 0;

        return (
            <div>
                <Menu {...this.props} activeTab={activeTab} />

                {this.props.children}
            </div>
        );
    }
}

AppContainer.propTypes = {
    params: React.PropTypes.object,
    children: React.PropTypes.node,
    tabs: React.PropTypes.object,
    addTabAction: React.PropTypes.func,
    editTabAction: React.PropTypes.func
};

function stateToProps(state){
    return {
        tabs: state.tabs
    };
}

function dispatchToProps(dispatch){
    return {
        addTabAction(){
            dispatch(createTab());
        },
        editTabAction(id, name){
            dispatch(renameTab(id, name));
        }
    };
}

export default connect(
    stateToProps,
    dispatchToProps
)(AppContainer);

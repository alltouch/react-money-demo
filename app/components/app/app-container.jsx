import React from 'react';
import { connect } from 'react-redux';

import './app.scss';
import { createTab, renameTab, removeTab } from '../../actions/tabs';
import { selectCurrency } from '../../actions/ui'
import Menu from './menu/menu.jsx';
import RemoveTabButton from './remove-tab-button.jsx';
import CurrencyList from './currency-list.jsx';

class AppContainer extends React.Component {
    render(){
        let props = this.props;

        return (
            <div>
                <Menu {...props} />
                <RemoveTabButton {...props} />
                <CurrencyList {...props} />

                {this.props.children}
            </div>
        );
    }
}

AppContainer.propTypes = {
    params: React.PropTypes.object,
    children: React.PropTypes.node,
    tabs: React.PropTypes.object,
    selectedCurrency: React.PropTypes.string,
    addTabAction: React.PropTypes.func,
    editTabAction: React.PropTypes.func,
    selectCurrencyAction: React.PropTypes.func
};

function calculateTotalCount(state, activeTab){
    return state.accounts.filter(account => account.tabId === activeTab).size;
}

function stateToProps(state, props){
    let activeTab = parseInt(props.params.tabId, 10) || 0;
    return {
        activeTab,
        selectedCurrency: state.ui.get('currency'),
        tabs: state.tabs,
        totalCount: calculateTotalCount(state, activeTab)
    };
}

function dispatchToProps(dispatch){
    return {
        addTabAction(){
            dispatch(createTab());
        },
        editTabAction(id, name){
            dispatch(renameTab(id, name));
        },
        removeTabAction(id){
            dispatch(removeTab(id));
        },
        selectCurrencyAction(name){
            dispatch(selectCurrency(name));
        }
    };
}

export default connect(
    stateToProps,
    dispatchToProps
)(AppContainer);

import React from 'react';
import { connect } from 'react-redux';
import { ALL_CURRENCY } from '../../config';
import { removeAccount, updateAccount } from '../../actions/account';
import AccountsTable from './accounts-table.jsx';
import AddAccountButton from './add-account-button.jsx'
import './account-list.scss'

class AccountsContainer extends React.Component {
    render() {
        let { addAccountUrl, children, ...other } = this.props;

        return (
            <div className="account-list">
                <AccountsTable {...other} />
                <AddAccountButton addAccountUrl={addAccountUrl} />

                {children}
            </div>
        )
    }
}

AccountsContainer.propTypes = {
    params: React.PropTypes.object,
    children: React.PropTypes.node,
    addAccountUrl: React.PropTypes.string,
    course: React.PropTypes.float,
    accounts: React.PropTypes.object,
    removeAccountAction: React.PropTypes.func,
    updateAccountAction: React.PropTypes.func
};

function calculateAccounts(state, activeTab){
    let currency = state.ui.get('currency');
    let tabs = state.tabs;

    return state.accounts
               .filter((account) => {
                   if(activeTab > 0 && account.tabId !== activeTab){
                       return false;
                   }
                   if(currency !== ALL_CURRENCY && account.currency !== currency){
                       return false;
                   }
                   return true;
               })
               .map((account) => {
                   var tabName = tabs.find(tab => tab.id === account.tabId).name;

                   return account.set('tabName', tabName);
               });
}

function calculateUrl(state, activeTab){
    if(!activeTab){
        return '';
    }
    return state.tabs.get(activeTab).getUrl() + '/add';
}

function stateToProps(state, props) {
    let activeTab = parseInt(props.params.tabId, 10) || 0;
    return {
        addAccountUrl: calculateUrl(state, activeTab),
        course: state.ui.get('course'),
        accounts: calculateAccounts(state, activeTab)
    };
}

function dispatchToProps(dispatch) {
    return {
        removeAccountAction(id){
            dispatch(removeAccount(id));
        },
        updateAccountAction(id, fields){
            dispatch(updateAccount(id, fields));
        }
    };
}

export default connect(
    stateToProps,
    dispatchToProps
)(AccountsContainer);

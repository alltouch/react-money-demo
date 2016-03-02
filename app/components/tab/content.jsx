import React from 'react';

import Actions from '../actions';
import RemoveButton from './remove-button.jsx';
import CurrencyList from './currency-list.jsx';
import AccountList from './account/list.jsx';
import AddAccountButton from './add-account-button.jsx';

export default React.createClass({
    observes: ['tabs', 'accounts', 'currency'],
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
        var activeTab = parseInt(this.props.params.tabId || 0);
        var tabs = this.state.tabs;
        var currency = this.state.currency;

        var accounts = this.state.accounts
            .filter(function (account) {
                if(activeTab > 0 && account.tabId !== activeTab){
                    return false;
                }
                if(currency !== 'All' && account.currency !== currency){
                    return false;
                }
                return true;
            })
            .map(function (account) {
                var tabName = tabs.find(tab => tab.id === account.tabId).name;

                return account.set('tabName', tabName);
            });

        var totalCount = this.state.accounts.filter(account => account.tabId === activeTab).size;

        return (
            <div>
                <RemoveButton activeTab={activeTab} totalCount={totalCount} />
                <CurrencyList currency={currency} />
                <AccountList accounts={accounts} />
                <AddAccountButton activeTab={activeTab} />
                {this.props.children}
            </div>
        );
    }
});

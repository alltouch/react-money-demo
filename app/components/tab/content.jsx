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
                if(activeTab > 0 && account.tabKey !== activeTab){
                    return false;
                }
                if(currency !== 'All' && account.currency !== currency){
                    return false;
                }
                return true;
            })
            .map(function (account) {
                var tabName = tabs.filter(tab => tab.key === account.tabKey)[0].name;

                return Object.assign({
                   tabName
                }, account);
            });

        var totalCount = this.state.accounts.filter(account => account.tabKey === activeTab).length;

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
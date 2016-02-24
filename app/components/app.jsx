import React from 'react';

import './app.scss';
import Menu from './menu/menu.jsx';
import Actions from '../actions';
import AccountList from './list/account-list.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        Actions.init(this);
    }

    render() {
        var isTotal = this.state.tabs.filter(tab => tab.key === 0)[0].active;
        var accounts = Actions.calculateAccounts();

        return (
            <div>
                <Menu tabs={this.state.tabs} />
                <AccountList accounts={accounts} isTotal={isTotal} />
            </div>
        );
    }
}

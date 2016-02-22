import React from 'react';
import Menu from './menu/menu.jsx';
import Actions from './actions';
import AccountList from './list/account-list.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        Actions.init(this);
    }

    render() {
        return (
            <div>
                <span className="glyphicon glyphicon-eur" />
                <Menu tabs={this.state.tabs} />
                <AccountList data={this.state.accounts} />
            </div>
        );
    }
}

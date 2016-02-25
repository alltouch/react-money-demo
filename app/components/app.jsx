import React from 'react';

import './app.scss';
import Menu from './menu/menu.jsx';
import Actions from '../actions';
import AccountList from './list/account-list.jsx';
import AddDialog from './add-dialog/add-dialog.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        Actions.init(this);
    }

    onRemoveClick(){
        Actions.removeOpenedTab();
    }

    changeCurrency(currency){
        return function (){
            Actions.setCurrency(currency);
        };
    }

    showAddDialog(){
        Actions.showAddDialog();
    }

    render() {
        var isTotal = this.state.tabs.filter(tab => tab.key === 0)[0].active;
        var showButtons = !isTotal;

        return (
            <div>
                <Menu tabs={this.state.tabs} />
                {showButtons ?
                    <button className="btn btn-danger pull-right" onClick={this.onRemoveClick}>Remove Tab</button>
                    : ''}

                <div className="btn-group">
                    {this.state.currenciesUI.map(currency => (
                        <button key={currency} onClick={this.changeCurrency(currency)}
                                className={'btn btn-default' + (currency === this.state.currency ? 'active': '')}
                        >{currency}</button>
                    ))}
                </div>

                <AccountList />

                {showButtons ?
                    <button className="btn btn-default pull-right" onClick={this.showAddDialog}>Add Account</button>
                    : ''}

                {this.state.showDialog ?
                    <AddDialog />
                    : ''}
            </div>
        );
    }
}

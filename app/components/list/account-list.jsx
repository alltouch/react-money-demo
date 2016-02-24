import React from 'react';

import './account-list.scss';
import Actions from './../../actions';
import AccountLine from './account-line.jsx';

export default React.createClass({
    onRemoveClick(){
        Actions.removeOpenedTab();
    },
    render(){
        if(!this.props.accounts || this.props.accounts.length === 0){
            return <div className="account-list empty">No accounts</div>;
        }

        var total = {
            name: 'Total',
            amount: 3333,
            currency: 'USD'
        };

        var showButtons = !this.props.isTotal;

        return (
            <div className="account-list">

                {showButtons ?
                    <button className="btn btn-danger pull-right" onClick={this.onRemoveClick}>Remove Tab</button>
                    : ''}

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Amount</td>
                            <td>Currency</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.accounts.map(line =>
                            <AccountLine key={line.key} line={line} />
                        )}
                        <AccountLine key="total" line={total} />
                    </tbody>
                </table>

                {showButtons ?
                    <button className="btn btn-default pull-right">Add Account</button>
                    : ''}

            </div>
        );
    }
});

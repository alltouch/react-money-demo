import React from 'react';

import './account-list.scss';
import Actions from './../../actions';
import AccountLine from './account-line.jsx';

export default React.createClass({

    render(){
        var accounts = Actions.calculateAccounts();

        if(!accounts.length){
            return <div className="account-list empty">No accounts</div>;
        }

        var total = {
            name: 'Total',
            amount: 3333,
            currency: 'USD'
        };


        return (
            <div className="account-list">

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
                        {accounts.map(line =>
                            <AccountLine key={line.key} line={line} />
                        )}
                        <AccountLine key="total" line={total} />
                    </tbody>
                </table>

            </div>
        );
    }
});

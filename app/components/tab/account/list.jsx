import React from 'react';

import './account-list.scss';
import Actions from '../../actions';
import AccountLine from './account-line.jsx';

export default React.createClass({
    observes: ['course'],
    getInitialState(){
        return Actions.getData(this);
    },
    render(){
        var accounts = this.props.accounts;
        var course = {
            'EUR': this.state.course
        };

        if(!accounts.length){
            return <div className="account-list empty">No accounts</div>;
        }

        var total = {
            name: 'Total',
            amount: accounts.map(account => {
                if(account.currency === 'USD'){
                    return account.amount;
                } else if(course[account.currency]){
                    return account.amount * course[account.currency];
                }
                return 0;
            }).reduce((prev, current) => prev + current),
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

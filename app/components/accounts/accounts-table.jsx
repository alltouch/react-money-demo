import React from 'react';

import AccountLine from './account-line.jsx';

export default class AccountsTable extends React.Component{

    render(){
        let {accounts, course, ...other} = this.props;
        let crossCourse = {
            'EUR': course
        };

        if(!accounts.size){
            return <div>No accounts</div>;
        }

        let total = {
            name: 'Total',
            amount: accounts.map(account => {
                if(account.currency === 'USD'){
                    return account.amount;
                } else if(crossCourse[account.currency]){
                    return account.amount * crossCourse[account.currency];
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
                        {accounts.map(account =>
                            <AccountLine key={account.getKey()} account={account} {...other} />
                        )}
                        <AccountLine key="total" account={total} />
                    </tbody>
                </table>

            </div>
        );
    }
}

AccountsTable.propTypes = {
    accounts: React.PropTypes.object,
    course: React.PropTypes.float
};

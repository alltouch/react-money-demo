import React from 'react';

import './account-list.scss';
import AccountLine from './account-line.jsx';

export default React.createClass({
    render(){
        if(!this.props.data || this.props.data.length === 0){
            return <div className="account-list empty">No accounts</div>;
        }

        var total = {
            name: 'Total',
            amount: 3333,
            currency: 'USD'
        };

        return (
            <div className="account-list">
                <button className="btn btn-danger pull-right">Remove Tab</button>

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
                        {this.props.data.map(line =>
                            <AccountLine key={line.key} line={line} />
                        )}
                        <AccountLine key="total" line={total} />
                    </tbody>
                </table>

                <button className="btn btn-default pull-right">Add Account</button>
            </div>
        );
    }
});

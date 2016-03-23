import React from 'react';
import { Link } from 'react-router';

export default class AddAccountButton extends React.Component{

    render(){
        let { addAccountUrl } = this.props;
        if(!addAccountUrl){
            return null;
        }

        return (
            <Link to={addAccountUrl} className="btn btn-default pull-right">Add Account</Link>
        );
    }
}

AddAccountButton.propTypes = {
    addAccountUrl: React.PropTypes.string
};

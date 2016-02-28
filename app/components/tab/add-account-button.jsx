import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
    render(){
        if(this.props.activeTab === 0){
            return null;
        }

        var url = `/${this.props.activeTab}/add`;

        return (
            <Link to={url} className="btn btn-default pull-right">Add Account</Link>
        );
    }
});

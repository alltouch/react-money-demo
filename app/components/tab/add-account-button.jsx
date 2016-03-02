import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    propTypes: {
        activeTab: React.PropTypes.number
    },
    render(){
        var url = `/${this.props.activeTab}/add`;

        if(this.props.activeTab === 0){
            return null;
        }

        return (
            <Link to={url} className="btn btn-default pull-right">Add Account</Link>
        );
    }
});

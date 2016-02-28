import React from 'react';

import Actions from '../actions';

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    onRemoveClick(){
        var tabKey = Actions.removeTab(this.props.activeTab);
        this.context.router.push({
            pathname: '/' + tabKey
        });
    },
    render(){

        if(this.props.activeTab === 0 ||
                this.props.totalCount > 0
        ){
            return null;
        }

        return (
            <button className="btn btn-danger pull-right" onClick={this.onRemoveClick}>Remove Tab</button>
        );
    }
});

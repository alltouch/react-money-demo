import React from 'react';

import Actions from '../actions';

export default React.createClass({
    propTypes: {
        activeTab: React.PropTypes.number,
        totalCount: React.PropTypes.number
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    onRemoveClick(){
        var tab = Actions.removeTab(this.props.activeTab);
        this.context.router.push({
            pathname: tab.getUrl()
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

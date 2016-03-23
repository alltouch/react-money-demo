import React from 'react';

export default class RemoveTabButton extends React.Component{
    render(){
        let { activeTab, totalCount, removeTabAction } = this.props;
        if(activeTab === 0 || totalCount > 0){
            return null;
        }
        let onRemoveClick = () => removeTabAction(activeTab);

        return (
            <button className="btn btn-danger pull-right" onClick={onRemoveClick}>Remove Tab</button>
        );
    }
}

RemoveTabButton.propTypes = {
    activeTab: React.PropTypes.number,
    totalCount: React.PropTypes.number,
    removeTabAction: React.PropTypes.func
};

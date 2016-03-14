import React from 'react';

export default class TabAdd extends React.Component {

    render(){
        return (
            <li>
                <a onClick={this.props.addTabAction}><span className="glyphicon glyphicon-plus" /></a>
            </li>
        );
    }
}

TabAdd.propTypes = {
    addTabAction: React.PropTypes.func
};

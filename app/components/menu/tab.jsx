import React from 'react';

export default React.createClass({

    onClick(){
        this.props.onChange(this.props.tab.key);
    },
    render(){
        var tab = this.props.tab;
        return (
            <li
                className={tab.active ? 'active' : ''}
                onClick={this.onClick}
            >{tab.name}</li>
        );
    }
});



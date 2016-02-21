import React from 'react';
import './menu.scss';
import Tab from './tab.jsx';

export default React.createClass({

    render(){
        return (
            <ul className="main-menu">
                {this.props.tabs.map(place =>
                    <Tab key={place.key} tab={place} onChange={this.props.onChange} />
                )}
            </ul>
        );
    }
});

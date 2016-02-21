import React from 'react';
import Note from './note.jsx';
import Menu from './menu/menu.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        var tabs = ['Всего', 'Банка 1', 'Банка 2'].map((name, index) => {
           return {
               key: index,
               name,
               active: index === 0
           };
        });

        this.state = {
            tabs
        };
    }

    updateActive(key){
        var tabs = this.state.tabs;
        tabs.filter(tab => tab.active).forEach(tab => tab.active = false);
        tabs.filter(tab => tab.key === key).forEach(tab => tab.active = true);
        this.setState({
            tabs: tabs
        });
    }

    render() {
        return (
            <div>
                <Menu tabs={this.state.tabs} onChange={this.updateActive.bind(this)} />
                fsdjfsdkhg
            </div>
        );
    }
}

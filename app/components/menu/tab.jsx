import React from 'react';
import {Link, IndexLink} from 'react-router';

import Actions from '../actions';

export default React.createClass({
    getInitialState(){
        return {
            editMode : false
        };
    },

    showEditMode(){
        this.setState({
            editMode : true
        });
    },
    hideEditMode(){
        this.setState({
            editMode: false
        });
    },
    saveName(){
        Actions.editTabName(
            this.props.tab.key,
            this.refs.input.value
        );
        this.hideEditMode();
    },
    onKeyDown(event){
        if(event.keyCode === 13){
            this.saveName();
        } else if(event.keyCode === 27){
            this.hideEditMode();
        }
    },
    render(){
        return this.state.editMode ? this.renderEditMode() : this.renderTextMode();
    },
    getClassName(){
        var tab = this.props.tab;
        var activeTabId = this.props.activeTab;

        var className = tab.key === 0 ? 'tab-total' : 'tab-editable';
        className += ' ' + (activeTabId === tab.key ? 'active': '');

        return className;
    },
    renderEditMode(){
        return (
            <li className={this.getClassName()}>
                <a>
                    <input className="form-control"
                           onKeyDown={this.onKeyDown}
                           defaultValue={this.props.tab.name}
                           ref="input" />
                </a>
                <span className="glyphicon glyphicon-ok" onClick={this.saveName} />
                <span className="glyphicon glyphicon-remove" onClick={this.hideEditMode} />
            </li>
        );
    },
    renderTextMode(){
        var tab = this.props.tab;

        return (
            <li className={this.getClassName()}>
                {tab.key === 0 ?
                    <IndexLink to={`/`}>{tab.name}</IndexLink>
                    :
                    <Link to={`/${tab.key}`}>{tab.name}</Link>
                }
                <span className="glyphicon glyphicon-pencil" onClick={this.showEditMode} />
            </li>
        );
    },
    componentDidUpdate(){
        var input = this.refs.input;
        if(input) {
            input.focus();
            input.selectionStart = 0;
            input.selectionEnd = input.value.length;
        }
    }
});



import React from 'react';
import { Link, IndexLink } from 'react-router';

import Actions from '../actions';

export default React.createClass({
    propTypes: {
        activeTab: React.PropTypes.number,
        tab: React.PropTypes.object
    },

    getInitialState(){
        return {
            editMode: false
        };
    },

    showEditMode(){
        this.setState({
            editMode: true
        });
    },
    hideEditMode(){
        this.setState({
            editMode: false
        });
    },
    saveName(){
        Actions.editTabName(
            this.props.tab.id,
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

        var className = tab.isTotal() ? 'tab-total' : 'tab-editable';
        className += ' ' + (activeTabId === tab.id ? 'active' : '');

        return className;
    },
    renderEditMode(){
        return (
            <li className={this.getClassName()}>
                <a>
                    <input className="form-control"
                            onKeyDown={this.onKeyDown}
                            defaultValue={this.props.tab.name}
                            ref="input"
                    />
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
                {tab.isTotal() ?
                    <IndexLink to={tab.getUrl()}>{tab.name}</IndexLink>
                    :
                    <Link to={tab.getUrl()}>{tab.name}</Link>
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

import React from 'react';

import Actions from '../../actions';

export default React.createClass({
    getInitialState(){
        return {
            editMode : false
        };
    },
    onClick(){
        Actions.selectTab(this.props.tab.key);
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

        var className = tab.key === 0 ? 'tab-total' : 'tab-editable';
        className += ' ' + (tab.active ? 'active' : '');
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
                <a onClick={this.onClick}>{tab.name}</a>
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



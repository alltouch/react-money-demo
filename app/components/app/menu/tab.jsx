import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Tab extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            editMode: false
        };
    }

    setEditMode(state){
        this.setState({
            editMode: state
        });
    }

    saveName(){
        this.props.editTabAction(
            this.props.tab.id,
            this.refs.input.value
        );
        this.setEditMode(false);
    }

    onKeyDown(event){
        if(event.keyCode === 13){
            this.saveName();
        } else if(event.keyCode === 27){
            this.setEditMode(false);
        }
    }

    render(){
        return this.state.editMode ? this.renderEditMode() : this.renderTextMode();
    }

    getClassName(){
        let { tab, activeTab } = this.props;

        var className = tab.isTotal() ? 'tab-total' : 'tab-editable';
        className += ' ' + (activeTab === tab.id ? 'active' : '');

        return className;
    }

    renderEditMode(){
        let onKeyDown = this.onKeyDown.bind(this);
        let saveName = this.saveName.bind(this);
        let hideEditMode = this.setEditMode.bind(this, false);

        return (
            <li className={this.getClassName()}>
                <a>
                    <input className="form-control"
                            onKeyDown={onKeyDown}
                            defaultValue={this.props.tab.name}
                            ref="input"
                    />
                </a>
                <span className="glyphicon glyphicon-ok" onClick={saveName} />
                <span className="glyphicon glyphicon-remove" onClick={hideEditMode} />
            </li>
        );
    }

    renderTextMode(){
        let tab = this.props.tab;
        let showEditMode = this.setEditMode.bind(this, true);

        return (
            <li className={this.getClassName()}>
                {tab.isTotal() ?
                    <IndexLink to={tab.getUrl()}>{tab.name}</IndexLink>
                    :
                    <Link to={tab.getUrl()}>{tab.name}</Link>
                }
                <span className="glyphicon glyphicon-pencil" onClick={showEditMode} />
            </li>
        );
    }

    componentDidUpdate(){
        var input = this.refs.input;
        if(input) {
            input.focus();
            input.selectionStart = 0;
            input.selectionEnd = input.value.length;
        }
    }
}

Tab.propTypes = {
    activeTab: React.PropTypes.number,
    tab: React.PropTypes.object,
    editTabAction: React.PropTypes.func
};

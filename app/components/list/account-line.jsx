import React from 'react';

export default React.createClass({
    render(){
        var line = this.props.line;

        var buttons;
        if(line.name === 'Total'){
            buttons = <td/>;
        } else {
            buttons = (
                <td>
                    <span className="glyphicon glyphicon-pencil" />
                    <span className="glyphicon glyphicon-remove" />
                </td>
            );
        }

        return (
            <tr>
                <td>
                    {line.name} &nbsp;
                    <span className="label label-default">{line.tabName}</span>
                </td>
                <td>{line.amount}</td>
                <td>{line.currency}</td>
                {buttons}
            </tr>
        );
    }
});

import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({
  getInitialState: function() {
    return {id: '', firstName: '', lastName: '', startDate:''};
  },
  handleIDChange: function(e) {
    this.setState({id: e.target.value});
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.state.id.trim();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var startDate = this.state.startDate.trim();
    if (!firstName || !lastName || !startDate) {
      return;
    }
    this.props.onPersonSubmit({id: id, firstName: firstName, lastName:lastName, startDate:startDate});
    this.setState({id: '', firstName: '',lastName: '', startDate: ''});
  },
  render: function() {
        return (
            <form className="peopleForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="First Name..."
                    value={this.state.firstName} onChange={this.handleFirstNameChange}
                />
		<input className="ui-widget ui-corner-all" type="text" placeholder="Last Name..."
                    value={this.state.lastName} onChange={this.handleLastNameChange}
                />
		<input className="ui-widget ui-corner-all" type="text" placeholder="Start Date..."
                    value={this.state.startDate} onChange={this.handleStartDateChange}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
});

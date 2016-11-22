var PersonBox = React.createClass({
  getInitialState: function() {
     return {data: []};
  },
  loadPeopleFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePersonSubmit: function(person) {
    var people = this.state.data;
    person.id = Date.now();
    var newPeople = people.concat([person]);
    this.setState({data: newPeople});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: people});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="personBox">
        <h1>People</h1>
        <PeopleList data={this.state.data} />
        <PeopleForm onPersonSubmit={this.handlePersonSubmit} />
      </div>
    );
  }
});

var PeopleList = React.createClass({
    render: function() {
        var peopleNodes = this.props.data.map(function(person) {
            return (
                <Person id={person.id} firstName={person.firstName} lastName={person.lastName} startDate={person.startDate} >
                    {person.firstName}{person.lastName}{person.startDate}
                </Person>
            );
        });
        return (
            <div className="peopleList">
                {peopleNodes}
            </div>
        );
    }
});

var Person = React.createClass({
    rawMarkup: function() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function() {
        return (
            <div className="personBox">
                <h2 className="personID" >
                    {this.props.id}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var PeopleForm = React.createClass({
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


ReactDOM.render(
    <PersonBox url="/" pollInterval={2000}/>,
    document.getElementById('content')
);

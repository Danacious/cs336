import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Person from './person';

module.exports = React.createClass({
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


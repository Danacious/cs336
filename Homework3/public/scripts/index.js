

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import PersonBox from './personBox';

import '../css/part1Style.css';

ReactDOM.render(
    <PersonBox url="/api/people" pollInterval={2000}/>,
    document.getElementById('content')
);

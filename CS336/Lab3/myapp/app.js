//Daniel Ermer
//CS 336 - Lab3

//Basic structure given by the express tutorial 
//from expressjs.com
var express = require('express');
var app = express();

//give the ability to use files from the public directory
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Gotta Catch em All!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



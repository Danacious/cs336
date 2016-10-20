//Daniel Ermer
//CS 336 - Lab7

var express = require('express');
var app = express();

//give the ability to use files from the public directory
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Gotta Catch em All!');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

app.get("/fetch", function(req, res) {
    res.send({"content" : "Hello Lab 7!"});
});


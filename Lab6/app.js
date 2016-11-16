//Daniel Ermer
//CS 336 - Lab6

//Answers to Questions:
//  6.1:
//   a. Only the GET method will work in the browser. Every request method
//      can be tested using curl. I think a lot of the request methods can't
//      be tested in a browser because only one /request response method can
//      be tested at a time.
//   b. I decided to use FORBIDDEN instead of NOT_FOUND.
//
//  6.2:
//   a. Forms only supports GET and POST.
//   b. As far as I can tell, the data is being sent from the client, to the
//      server, and then changed to an html format based on the post request
//      method that was given for the lab. That data is then sent back to the
//      client to be displayed in the brower.

var express = require('express');
var app = express();
var http_status = require('http-status-codes');
var bodyParser = require('body-parser');

//give the ability to use files from the forms directory
app.use(express.static('forms'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//All of the necessary response methods for 6.1
app.get('/request', function (req, res){
   res.send("Got a GET request");
   res.sendStatus(200);
});

app.head('/request', function (req, res){
   res.send("Got a HEAD request");
   res.sendStatus(200);
});

app.put('/request', function (req, res){
   res.send("Got a PUT request");
   res.sendStatus(200);
});

app.post('/request', function (req, res){
   res.send("Got a POST request");
   res.sendStatus(200);
});

app.delete('/request', function (req, res){
   res.send("Got a DELETE request");
   res.sendStatus(200);
});

//Taken from code example and necessary for 6.2
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});

app.all('*', function (req, res){
   res.sendStatus(http_status.FORBIDDEN);
});

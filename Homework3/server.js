//Daniel Ermer
//CS 336 - Homework 2

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'peopleList.json');

//allow the server access to the public folder
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function Person(firstName, lastName, startDate){
   this.firstName = firstName;
   this.lastName = lastName;
   this.startDate = startDate;
}

//Hard code some people objects
var people = {
   "dee7": new Person("Dan", "Ermer", "06/08/1995"),
   "Ten": new Person("Joe", "Bob", "10/3/2016"),
   "Star": new Person("Sarah", "Evans", "11/23/2015")
}

//Listen for port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// Display a full list of people
app.get('/people', function (req, res) {
   res.json(people);
});

// Full records by loginID
app.get('/people/:id', function (req, res) {
    if (req.params.id in people){
        res.json(people[req.params.id]);
     }
     else{
        res.sendStatus(404);
     }
});

//Put request to add a new person to the database
app.put('/people/:id', function(req, res) {
   var confirm;
   if(req.params.id in people){
      people[req.params.id].firstName = req.body.firstName
      people[req.params.id].lastName = req.body.lastName
      people[req.params.id].startDate = req.body.startDate
      confirm = req.params.id + " was created.";
   }
   else{
      confirm = "Couldn't create/find this person."
   }
   res.json(confirm);
});

//Route for displaying what the server has added to the
//database
app.post('/people', function (req, res){
   people[req.body.id] = new Person(req.body.firstName,
                         req.body.lastName,
                         req.body.startDate);
   res.send("Addition successful!");
});

//Delete reqest for deleting a person
//Tested using curl
app.delete('/people/:id', function(req, res) {
   var confirm;
   if(req.params.id in people){
   delete people[req.params.id];
   confirm = req.params.id + "is gone."
   }
   else{
      confirm = "Couldn't delete/find this person"
   }
   res.json(confirm);
});

//First and last names by ID
app.get('/people/:id/name', function (req, res) {
     if (req.params.id in people){
        res.json(people[req.params.id].firstName + " " + people[req.params.id].lastName);
     }
     else{
        res.sendStatus(404);
     }
});

//Years in the company by ID
//Need to insert a years function
app.get('/people/:id/years', function (req, res) {
   if (req.params.id in people){
      res.json(getAge(people[req.params.id].startDate));
   }
   else{
      res.sendStatus(404);
   }
});

//function for finding the number of years between 2 dates
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

app.post('/addperson', function(req, res){
   people[req.body.code] = new Person(req.body.firstName, req.body.lastName, req.body.startDate);
   res.send('Submited form info<p>ID:<code>' +req.body.code + 
     '</code><p>First Name:<code>' + req.body.firstName +
     '</code><p>Last Name:<code>' + req.body.lastName +
     '</code><p>Start Date:<code>' + req.body.startDate + '</code>');
});

app.post('/search', function(req, res){
   var foundName;
   if(req.body.searchID in people){
      foundName = "Login ID: " + req.body.searchID + "," +
               " First Name: " + people[req.body.searchID].firstName + "," +
               " Last Name: " + people[req.body.searchID].lastName + "," +
               " Start Date: " + people[req.body.searchID].startDate; 
   }
   else{
      foundName = "Couldn't find this person";
   }
   res.json(foundName);
});

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var people = JSON.parse(data);
    var newPerson = {
      id: req.body.code,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      startDate: req.body.startDate,
    };
    people.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(people);
    });
  });
});



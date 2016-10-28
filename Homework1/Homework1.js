//Daniel Ermer
//CS 336 - Homework 1

var express = require('express');
var app = express();

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

// Bring of a full list of people
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

//First and last names by ID
app.get('/people/:id/name', function (req, res) {
     if (req.params.id in people){
        res.json("The name of this person is: " + people[req.params.id].firstName + " " + people[req.params.id].lastName);
     }
     else{
        res.sendStatus(404);
     }
});

//Years in the company by ID
app.get('/people/:id/years', function (req, res) {
    for (i = 0; i < 3; i++){
     if (req.params.id in people){
        res.json(getAge(people[req.params.id].startDate));
     }
     else{
        res.sendStatus(404);
     }
  }
});

//Function for finding the number of years between two dates
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

//Daniel Ermer
//CS 336 - Homework 1

var express = require('express');
var app = express();

function Person(firstName, lastName, loginID, startDate){
   this.firstName = firstName;
   this.lastName = lastName;
   this.loginID = loginID;
   this.startDate = startDate;
}

//Hard code some people objects
var person1 = new Person("Dan", "Ermer", "Danacious", "06/08/1995");
var person2 = new Person("Joe", "Bob", "1234", "10/3/2016");
var person3 = new Person("Sarah", "Evans", "Star", "11/23/2015");

//Make a list of those people
var peopleList = [person1, person2, person3];

//Listen for port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// Bring of a full list of people
app.get('/people', function (req, res) {
   res.json(peopleList);
});

// Full records by loginID
app.get('/people/Danacious', function (req, res) {
  for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "Danacious"){
        res.json(peopleList[i]);
     }
     else{
        res.sendStatus(404);
     }
  }
});

app.get('/people/1234', function (req, res) {
  for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "1234"){
        res.json(peopleList[i]);
     }
     else{
        res.sendStatus(404);
     }
  }
});

app.get('/people/Star', function (req, res) {
  for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "Star"){
        res.json(peopleList[i]);
     }
     else{
        res.sendStatus(404);
     }
  }
});

//First and last names by ID
app.get('/people/Danacious/name', function (req, res) {
  for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "Danacious"){
        res.json("The name of this person is: " + peopleList[i].firstName + " " + peopleList[i].lastName);
     }
     else{
        res.sendStatus(404);
     }
  }
});

app.get('/people/1234/name', function (req, res) {
  for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "1234"){
        res.json("The name of this person is: " + peopleList[i].firstName + " " + peopleList[i].lastName);
     }
     else{
        res.sendStatus(404);
     }
  }
});

app.get('/people/Star/name', function (req, res) {
  for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "Star"){
        res.json("The name of this person is: " + peopleList[i].firstName + " " + peopleList[i].lastName);
     }
     else{
        res.sendStatus(404);
     }
  }
});

//Years in the company by ID
app.get('/people/Danacious/years', function (req, res) {
    for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "Danacious"){
        res.json("This person has been in the company for 21 years");
     }
     else{
        res.sendStatus(404);
     }
  }
});

app.get('/people/1234/years', function (req, res) {
    for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "1234"){
        res.json("This person has been in the company for 0 years");
     }
     else{
        res.sendStatus(404);
     }
  }
});

app.get('/people/Star/years', function (req, res) {
    for (i = 0; i < 3; i++){
     if (peopleList[i].loginID == "Star"){
        res.json("This person has been in the company for 1 years");
     }
     else{
        res.sendStatus(404);
     }
  }
});



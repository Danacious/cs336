//Daniel Ermer
//CS 336 - Homework 3

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient

var db;

var COMMENTS_FILE = path.join(__dirname, 'peopleList.json');

//allow the server access to the public folder
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 3000));

//Most, if not all, code very heavily influenced by labs 8 and 10
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

MongoClient.connect('mongodb://cs336:bjarne@ds053295.mlab.com:53295/cs336', function (err, db) {
  if (err) throw err

  db.collection('people').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
})

app.get('/api/people', function(req, res) {
    db.collection("people").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.post('/api/people', function(req, res) {
    var newPerson = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate,
    };
    db.collection("people").insertOne(newPerson, function(err, result) {
        if (err) throw err;
        var newId = result.insertedId;
        db.collection("people").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

fs.readFile(path.join(__dirname, '.passwordrc'), function(err, password) {
    if (err) throw err;
    var mongoURL = 'mongodb://cs336:bjarne@ds053295.mlab.com:53295/cs336';
    MongoClient.connect(mongoURL, function(err, dbConnection) {
        if (err) throw err;
        db = dbConnection;
    });
});



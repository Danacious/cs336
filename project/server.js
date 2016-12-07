/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*    */

 var path = require('path');
 var express = require('express');
 var bodyParser = require('body-parser');
 var app = express();
 var MongoClient = require('mongodb').MongoClient

 var db;
 var APP_PATH = path.join(__dirname, 'dist');

 app.set('port', (process.env.PORT || 3000));

 app.use('/', express.static(APP_PATH));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));

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
  db.collection("comments").find({}).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

app.post('/api/comments', function(req, res) {
  var newComment = {
    id: Date.now(),
    author: req.body.author,
    text: req.body.text,
  };
  db.collection("comments").insertOne(newComment, function(err,result){
    if (err) throw err;
    var newId = result.insertedId;
    db.collection("comments").find({_id: newId}).next(function(err, doc) {
      if (err) throw err;
      res.json(doc);
    });
  });
});

app.get('/api/comments/:id', function(req, res) {
    db.collection("comments").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

app.put('/api/comments/:id', function(req, res) {
    var updateId = Number(req.params.id);
    var update = req.body;
    db.collection('comments').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
            if (err) throw err;
            db.collection("comments").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

app.delete('/api/comments/:id', function(req, res) {
    db.collection("comments").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
            if (err) throw err;
            db.collection("comments").find({}).toArray(function(err, docs) {
                if (err) throw err;
                res.json(docs);
            });
        });
});

// Send all routes/methods not specified above to the app root.
app.use('*', express.static(APP_PATH));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var mongoURL = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds147797.mlab.com:47797/cs336db';
MongoClient.connect(mongoURL, function(err, dbConnection) {
  if (err) {
    throw err;
  }
    db = dbConnection; //saves the db handle for routers to use
  });

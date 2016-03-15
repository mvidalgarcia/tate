var express = require('express');
var router = express.Router();
var http = require('http'); // Allow API REST local resquests

/* GET all artworks. */
router.get('/', function(req, res, next) {
  /*
    Request to a local API allows to do pagination.
    Otherwise, the resquest are so slow due to huge
    amount of data.
  */
  var options = {
      host: 'localhost',
      port: 3000,
      path: '/artworks/api?limit=100&lastid=0',
      method: 'GET',
      headers: {
          accept: 'application/json'
      }
  };

  var x = http.request(options,function(response){
      var body = '';
      response.on('data', function(data){
          body += data;
      });
      response.on('end', function() {
          // Data reception is done, do whatever with it!
          var parsed = JSON.parse(body);
          var last_id = parsed[parsed.length-1].id;
          res.render('artworks', {
              "title": "Tate - Artworks",
              "artworks" : parsed,
              "last_id" : last_id
          });
      });
  });

  x.end();

});

/*
  REST API artworks pagination
  example: /artworks/api?limit=10&lastid=123
*/
router.get('/api', function(req, res, next) {
  var db = req.db;
  var limit = parseInt(req.query.limit);
  var last_id = parseInt(req.query.lastid);
  var collection = db.get('artworks');
  collection.find({id: {$gt: last_id}},{limit: limit, sort: {id: 1}}, function(e, docs){
    res.json(docs);
  });
});

/*
  REST API Filter artworks by acquisition year range
  example: /artworks/api/from/1950/to/1980?limit=10&lastid=123
*/
router.get('/api/from/:from/to/:to', function(req, res, next) {
  var db = req.db;
  var limit = parseInt(req.query.limit);
  var last_id = parseInt(req.query.lastid);
  if ((!isNaN(parseInt(req.params.from))) && (!isNaN(parseInt(req.params.to)))) {
    var from_year = parseInt(req.params.from);
    var to_year = parseInt(req.params.to);
    var collection = db.get('artworks');
    collection.find({acquisitionYear: {$gte: from_year, $lte: to_year}, id: {$gt: last_id}},{limit: limit, sort: {id: 1}}, function(e, docs){
      res.json(docs);
    });
  }
});

module.exports = router;

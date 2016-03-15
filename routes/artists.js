var express = require('express');
var router = express.Router();

/* GET all artists. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('artists');
  collection.find({},{sort: {fc: 1}},function(e, docs){
    res.render('artists', {
        "title": "Tate - Artists",
        "artists" : docs
    });
  });
});

/* GET artists filtered by birth year. */
router.get('/from/:from/to/:to', function(req, res, next) {
  var db = req.db;
  var collection = db.get('artists');
  if ((!isNaN(parseInt(req.params.from))) && (!isNaN(parseInt(req.params.to)))) {
    var from_date = parseInt(req.params.from);
    var to_date = parseInt(req.params.to);
    collection.find({birthYear: {$gte: from_date, $lte: to_date}},{sort: {birthYear: 1}},function(e, docs){
      res.render('artists', {
          "title": "Artists from " + from_date + " to " + to_date,
          "artists" : docs
      });
    });
  }
});

module.exports = router;

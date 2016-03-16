var express = require('express');
var router = express.Router();

/* GET artist info. */
router.get('/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('artists');
  var artist_id = parseInt(req.params.id);
  collection.findOne({id: {$eq: artist_id}},{},function(e, docs){
    if (docs.birthYear > 1900) {
      res.render('artist_new', {
          "title": "Tate - Artist",
          "artist" : docs
      });
    }
    else {
      res.render('artist', {
          "title": "Tate - Artist",
          "artist" : docs
      });
    }
  });
});

module.exports = router;

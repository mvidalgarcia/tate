var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
    var collection = db.get('artworks');
    collection.find({},function(e, docs){
      res.render('artworks', {
          "title": "Artworks",
          "artworks" : docs
      });
    });
});

module.exports = router;

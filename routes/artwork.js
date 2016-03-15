var express = require('express');
var router = express.Router();

/* GET artwork info. */
router.get('/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('artworks');
  var artwork_id = parseInt(req.params.id);
  collection.findOne({id: {$eq: artwork_id}},{},function(e, docs){
    res.render('artwork', {
        "title" : "Tate - Artwork",
        "artwork" : docs
    });
  });
});

module.exports = router;

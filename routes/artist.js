var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var db = req.db;
  var collection = db.get('artists');
  var artist_id = parseInt(req.params.id);
  collection.findOne({id: {$eq: artist_id}},{},function(e, docs){
    res.render('artist', {
        "artist" : docs
    });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
    var collection = db.get('artistcollection');
    collection.find({},'-_id',function(e, docs){
      console.log(docs[0].birth);
      res.render('artists', {
          "title": "Artists",
          "artists" : docs
      });
    });
});

module.exports = router;

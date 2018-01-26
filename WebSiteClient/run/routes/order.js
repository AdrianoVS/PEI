var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies)
  if(req.cookies.online === undefined){
    res.redirect('/signin')
  }
  else{
    res.redirect('/home')
  }
});

module.exports = router;

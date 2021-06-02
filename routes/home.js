var express = require('express');
var router = express.Router(); // 사용해서 router함수를 초기화

// Home
router.get('/', function(req, res){ // get 요청이 오는 경우를 router함수에 설정
  res.redirect('/contacts');
});

module.exports = router; // object(여기서는 router object)가 module이 되어require시에 사용
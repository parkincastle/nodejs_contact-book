var express = require('express');
var mongoose = require('mongoose');
var app = express();

// DB setting : mongoose의 몇몇 글로벌 설정을 해 주는 부분
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);    
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB); // process.env.MONGO_DB ㅗㄹ 해당 값을 불러올 수 있다.
var db = mongoose.connection; //mongoose의 db object를 가져와 db변수에 넣는 과정

//db가 성공적으로 연결시 "DB connected"를 출력
db.once('open', function(){
  console.log('DB connected');
});
//db연결중 에러가 있을시 "DB ERROR : " 와 에러를 출력
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});
// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
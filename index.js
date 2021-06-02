var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //  body-parser module를 bodyPaser 변수에 담는다
var methodOverride = require('method-override'); // method-override module을 methodOverride변수에 담는다.
var app = express();

// DB setting : mongoose의 몇몇 글로벌 설정을 해 주는 부분
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);    
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB); // process.env.MONGO_DB러 해당 값을 불러올 수 있다.
var db = mongoose.connection; //mongoose의 db object를 가져와 db변수에 넣는 과정

//db가 성공적으로 연결시 "DB connected"를 출력
db.once('open', function(){
  console.log('DB connected');
});
//db연결중 에러가 있을시 "DB ERROR : " 와 에러를 출력
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});
// nest추천

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // json 형식의 데이터를 받는 설정
app.use(bodyParser.urlencoded({extended:true})); // urlencoded data를 extended 알고리증을 사용해서 분석하는 설정
app.use(methodOverride('_method')); //  HTTP method를 _method의 query로 들어오는 값으로 바꾼다

// Routes : app.use('route', 콜백_함수)는 해당 route에 요청이 오는 경우에만 콜백 함수를 호출
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log("server on! http://localhost:" + port);
});
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

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // json 형식의 데이터를 받는 설정
app.use(bodyParser.urlencoded({extended:true})); // urlencoded data를 extended 알고리증을 사용해서 분석하는 설정
app.use(methodOverride('_method')); //  HTTP method를 _method의 query로 들어오는 값으로 바꾼다

// DB schema // mongoose.Schema 함수로 DB에서 사용할 schema를 설정
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model('contact', contactSchema); // mongoose.model함수를 사용하여 contact schema의 model을 생성

// Routes
// Home // "/"에 get 요청이 오는 경우
app.get('/', function(req, res){
  res.redirect('/contacts');
});
// Contacts - Index // "/contacts"에 get 요청이 오는 경우
app.get('/contacts', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});
// Contacts - New // "/contacts/new"에 get 요청이 오는 경우
app.get('/contacts/new', function(req, res){
  res.render('contacts/new');
});
// Contacts - create // "/contacts"에 post 요청이 오는 경우
app.post('/contacts', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

// Contacts - show // 3
app.get('/contacts/:id', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});
// Contacts - edit // 4
app.get('/contacts/:id/edit', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});
// Contacts - update // 5
app.put('/contacts/:id', function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});
// Contacts - destroy // 6
app.delete('/contacts/:id', function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log("server on! http://localhost:" + port);
});
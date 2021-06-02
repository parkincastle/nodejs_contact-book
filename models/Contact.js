var mongoose = require('mongoose');

// DB schema // mongoose.Schema 함수로 DB에서 사용할 schema를 설정
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
  });
  var Contact = mongoose.model('contact', contactSchema); // mongoose.model함수를 사용하여 contact schema의 model을 생성

module.exports = Contact;
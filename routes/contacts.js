var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact'); // contact.js에는 Contact module을 require로 호출

// Contacts - Index // "/contacts"에 get 요청이 오는 경우
router.get('/', function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});

// Contacts - New // "/contacts/new"에 get 요청이 오는 경우
router.get('/new', function(req, res){
  res.render('contacts/new');
});

// Contacts - create // "/contacts"에 post 요청이 오는 경우
router.post('/', function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

// Contacts - show // "contacts/:id"에 get 요청이 오는 경우
router.get('/:id', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/show', {contact:contact});
  });
});

// Contacts - edit //  "contacts/:id/edit"에 get 요청이 오는 경우
router.get('/:id/edit', function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render('contacts/edit', {contact:contact});
  });
});

 // Contacts - update // "contacts/:id"에 put 요청이 오는 경우
router.put('/:id', function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});

// Contacts - destroy // "contacts/:id"에 delete 요청이 오는 경우
router.delete('/:id', function(req, res){
  Contact.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

module.exports = router;
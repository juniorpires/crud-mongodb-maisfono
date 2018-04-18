var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('index', { title: '+Fono', docs: docs });
})
});

// CRUD PACIENTE
router.get('/lista-pacientes', function(req, res, next) {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('lista-pacientes', { title: 'Listar Pacientes', docs: docs });
})
});

router.get('/new-paciente', function(req, res, next) {
  res.render('new-paciente', { title: 'Novo Cadastro de Paciente', doc: 
  {"nome":"",
  "telefone":"",
  "data_nascimento":"",
  "deficiencias":[]}, action: '/new-paciente' });
});


router.post('/new-paciente', function(req, res) {
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var data_nascimento = req.body.data_nascimento;
  var deficiencias = req.body.deficiencias.split(",");
  global.db.insert({nome, telefone,data_nascimento,deficiencias}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/lista-pacientes');
      })
})


router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      docs[0].deficiencias = docs[0].deficiencias.join();
      console.log(docs[0].deficiencias);
      res.render('new-paciente', { title: 'Edição de paciente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})


router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var data_nascimento = req.body.data_nascimento;
  var deficiencias = req.body.deficiencias.split(",");
  global.db.update(id,{ $set:{nome, telefone,data_nascimento,deficiencias}}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/lista-pacientes');
    });
});


router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/lista-pacientes');
      });
});

// CRUD FONO

router.get('/lista-fono', function(req, res, next) {
  global.db.findAllFono((e, docs) => {
    if(e) { return console.log(e); }
    res.render('lista-fono', { title: 'Listar Fonoaudiologos', docs: docs });
})
});

router.get('/new-fono', function(req, res, next) {
  res.render('new-fono', { title: 'Novo Cadastro de Fonoaudiologo', doc: 
  {"nome":"",
  "telefone":"",
  "CRF":"",
  "formacao":[]}, action: '/new-fono' });
});

router.post('/new-fono', function(req, res) {
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var CRF = req.body.CRF;
  var formacao = req.body.formacao.split(",");
  global.db.insertFono({nome, telefone,CRF,formacao}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/lista-fono');
      })
})

router.get('/new-fono/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOneFono(id, (e, docs) => {
      if(e) { return console.log(e); }
      docs[0].formacao = docs[0].formacao.join();
      console.log(docs[0].formacao);
      res.render('new-fono', { title: 'Edição de paciente', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})


router.post('/new-fono/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var CRF = req.body.CRF;
  var formacao = req.body.formacao.split(",");
  global.db.updateFono(id,{ $set:{nome, telefone,CRF,formacao}}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/lista-fono');
    });
});


router.get('/new-fono/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOneFono(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/lista-fono');
      });
});

module.exports = router;

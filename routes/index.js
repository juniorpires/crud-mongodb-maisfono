var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
    if(e) { return console.log(e); }
    res.render('index', { title: 'Lista de Clientes', docs: docs });
})
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: 
  {"nome":"",
  "telefone":"",
  "data_nascimento":"",
  "deficiencias":[]}, action: '/new' });
});


router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var telefone = req.body.telefone;
  var data_nascimento = req.body.data_nascimento;
  var deficiencias = req.body.deficiencias.split(",");
  global.db.insert({nome, telefone,data_nascimento,deficiencias}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})


router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      docs[0].deficiencias = docs[0].deficiencias.join();
      console.log(docs[0].deficiencias);
      res.render('new', { title: 'Edição de paciente', doc: docs[0], action: '/edit/' + docs[0]._id });
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
        res.redirect('/');
    });
});


router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});


module.exports = router;

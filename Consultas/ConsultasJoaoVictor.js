// CONSULTAS FEITAS POR JOÃO VICTOR CARDOSO DE SANTANA

// 1 - BUSCA TODAS AS CONSULTAS QUE FORAM CANCELADAS
db.agenda.find({"status":"cancelada"});

// 2 - BUSCA TODAS AS CONSULTAS QUE FORAM REALIZADAS COM NOME EM ORDEM CRESCENTE E UM LIMITE DE 3
db.agenda.find({"status":"realizada"}, {"id_fono":1}).limit(3);

// 3 - BUSCA AS CONSULTAS CANCELADAS NA DATA DETERMINADA
db.agenda.find({"status":"cancelada" ,"data" : ISODate("2018-01-01T00:00:00.000Z"),})

// 4 - BUSCA CONSULTA DE PACIENTE E FONOAUDIOLOGO EXATO
db.agenda.find({"id_paciente":"30" , "id_fono":"3" })

// 5 - MOSTRA AS CONSULTAS AGENDADAS EM POR ORDEM CRESCENTE
db.agenda.find({"status":"agendada"},{"status":1}).sort({"data":1})

// 6 - MOSTRA OS REGISTROS COM NOMES EM ORDEM CRESCENTE
db.paciente.find().sort({"nome":1});

// 7 - MOSTRA OS REGISTROS COM NOMES EM ORDEM DECRESCENTE
db.paciente.find().sort({"nome":-1});

// 8 -  MOSTRA TODOS OS REGISTRO QUE TEM NUMERO NO ENDEREÇO
db.paciente.find({"endereco.numero" : { $exists : true }})

// 9 -  MOSTRA O NOME DO PACIENTE E O ENDEREÇO DAQUELE QUE TEM 'AM' EM ALGUMA PARTE DO NOME
db.paciente.find({nome : { $regex : "am.*", $options: "i" } }, {"nome":1,"endereco":1,});

// 10 -  MOSTRA O NOME DO PACIENTE E O ENDEREÇO DAQUELE QUE TEM 'Jo' NO INICIO DO NOME
db.paciente.find({ nome :{ $regex : /^Jo/i, }},{"nome":1,"endereco":1,});

// 11 - BUSCA O PACIENTE POR DEFICIENCIA
db.paciente.find({ "deficiencia": { $eq: "dislalia" }},{"nome": 1,"telefone" :1,"endereco.logradouro":1})

// 12 - MOSTRA OS PACIENTES QUE MORAM EM DETERMINADA CIDADE E TEM DETERMINADA DEFICIENCIA
db.paciente.find({$and:[{"endereco.cidade" : {$eq :"Cristais"}}, {"deficiencia" : {$eq : "gagueira"}}]})

// 13 - MOSTRA APENAS OS QUE NÃO TEM DETERMINADA DEFICIENCIA
db.paciente.find({"deficiencia" : {$ne : "gagueira"}})

// 14 - MOSTRA OS PACIENTES DE DETERMINADA CIDADE QUE TEM DETERMINADA DEFICIENCIA OU OUTRA.
db.paciente.find({"endereco.cidade": "Cristais" ,  $or : [{ "deficiencia" : "afasia " },{ "deficiencia" : "dislalia" }]})

// 15 - MOSTRA OS PACIENTES QUE TEM 2 DEFICIENCIAS COM NOME EM ORDEM CRESCENTE
db.paciente.find({"deficiencia":{$size : 2}}).sort({"nome":1})

// 16 - MOSTRA NOME E DEFICIENCIA DOS PACIENTES MENORES DE 18 ANOS
db.paciente.find({"data_nascimento":{"$gt" : ISODate("2000-04-24T00:00:01Z")}}, {"nome" :1, "deficiencia":1})

// 17 - MOSTRA A EVOLUÇÃO DE DETERMINADO PACIENTE
db.evolucao.find({"id_paciente" :"20"  },{"descricao":1,"data":1});

// 18 - MOSTRA DESCRIÇÃO DA EVOLUÇÃO E ID DO PACIENTE REGISTRADA EM DETERMINADA DATA
db.evolucao.find({"data" : ISODate("2018-02-21T00:00:00.000Z")},{"descricao" :1,"id_fono" : 1})

// 19 - MOSTRA OS REGISTRO ONDE TEM NA DESCRIÇÃO DA EVOLUÇÃO A PALAVRA 'dificuldades' EM ORDEM CRESCENTE
 db.evolucao.find({ descricao : { $regex : "dificuldades.*", $options: "i" } }).sort({"nome":1})
 
//  20 - MOSTRA NOME, ID E FORMAÇAO DOS FONOAUDIOLOGOS QUE TEM FORMAÇÃO CADASTRADA
db.fonoaudiologo.find({"formacao":{ $exists : true }},{"nome":1,"CRF":1,"formacao":1})

//  21 - MOSTRA NOME E ID DOS FONOAUDIOLOGOS QUE NÃO TEM FORMAÇÃO CADASTRADA
db.fonoaudiologo.find({"formacao":{ $exists : false }},{"nome":1, "CRF":1,})

// 22 - BUSCA O FONO QUE TEM AS LETRAS 'Wy'INICIANDO O NOME E MOSTRA O NOME E A FORMAÇÃO 
db.fonoaudiologo.find({ nome :{ $regex : /^Wy/i,}},{"nome":1,"formacao":1,});

//  23 - AGREGA TODOS OS PACIENTES A CADA UM FONOAUDIOLOGO
db.fonoaudiologo.aggregate([{   
      $lookup:
        {
          from: "paciente",
          localField: "agenda",
          foreignField: "deficiencia",
          as: "paciente_docs"
        }
    }
 ])
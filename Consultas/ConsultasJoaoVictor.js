// CONSULTAS FEITAS POR JOÃO VICTOR CARDOSO DE SANTANA

// 1 - BUSCA TODAS AS CONSULTAS QUE FORAM CANCELADAS
db.agenda.find({"status":"cancelada"});
/* 1 */
{
    "_id" : ObjectId("5ad7e1e3363f9bd5db1d8566"),
    "data" : ISODate("2018-01-01T00:00:00.000Z"),
    "id_fono" : "13",
    "id_paciente" : "33",
    "status" : "cancelada"
}
/* 2 */
{
    "_id" : ObjectId("5ad7e1e3363f9bd5db1d8567"),
    "data" : ISODate("2018-02-05T00:00:00.000Z"),
    "id_fono" : "2",
    "id_paciente" : "25",
    "status" : "cancelada"
}

// 2 - BUSCA AS CONSULTAS CANCELADAS NA DATA DETERMINADA
db.agenda.find({
    "status":"cancelada" ,
    "data" : ISODate("2018-01-01T00:00:00.000Z"),
   })
 /* 1 */
{
    "_id" : ObjectId("5ad7e1e3363f9bd5db1d8566"),
    "data" : ISODate("2018-01-01T00:00:00.000Z"),
    "id_fono" : "13",
    "id_paciente" : "33",
    "status" : "cancelada"
}

// 3 - BUSCA CONSULTA DE PACIENTE E FONOAUDIOLOGO EXATO
db.agenda.find({
    "id_paciente":"30" ,
    "id_fono":"3" ,
})
/* 1 */
{
    "_id" : ObjectId("5ac6ab7afd62e6e06529ea89"),
    "data" : ISODate("2018-01-07T00:00:00.000Z"),
    "id_fono" : "3",
    "id_paciente" : "30",
    "status" : "realizada"
}
/* 2 */
{
    "_id" : ObjectId("5ac6ab7afd62e6e06529ea8a"),
    "data" : ISODate("2018-02-14T00:00:00.000Z"),
    "id_fono" : "3",
    "id_paciente" : "30",
    "status" : "realizada"
}

// 4 - MOSTRA OS REGISTROS COM NOMES EM ORDEM CRESCENTE
db.paciente.find().sort({"nome":1});
/* 1 */
{
    "_id" : "40",
    "nome" : "Alberto Assis do Batuque",
    "telefone" : "87991127890",
    "data_nascimento" : ISODate("1998-11-07T00:00:00.000Z"),
    "deficiencia" : [ 
        "rinolalia", 
        "gagueira"
    ],
    "endereco" : {
        "logradouro" : "Avenida de todos",
        "numero" : "232",
        "bairro" : "Alcaçus",
        "cidade" : "Cristais",
        "cep" : "55223000"
    }
}
/* 2 */
{
    "_id" : "60",
    "nome" : "Clarice Borges Salgueiro",
    "telefone" : "87991112398",
    "data_nascimento" : ISODate("2011-09-04T00:00:00.000Z"),
    "deficiencia" : [ 
        "afasia"
    ],
    "endereco" : {
        "logradouro" : "Rua do relógio",
        "numero" : "371",
        "bairro" : "México",
        "cidade" : "Cristais",
        "cep" : "55221000"
    }
}

// 5 - MOSTRA OS REGISTROS COM NOMES EM ORDEM DECRESCENTE
db.paciente.find().sort({"nome":-1});
/* 1 */
{
    "_id" : ObjectId("5ad2615855b58e29d4828b0c"),
    "nome" : "Victor Cardoso",
    "telefone" : "111111",
    "data" : "1988-01-01",
    "deficiencias" : [ 
        "gagueira", 
        " Mais um"
    ],
    "data_nascimento" : "1988-01-01"
}
/* 2 */
{
    "_id" : "20",
    "nome" : "Ramiro Santos",
    "telefone" : "87991929394",
    "data_nascimento" : ISODate("1990-07-10T00:00:00.000Z"),
    "deficiencia" : [ 
        "dislalia"
    ],
    "endereco" : {
        "logradouro" : "Rua das cerejeiras",
        "numero" : "19",
        "bairro" : "Lamparina",
        "cidade" : "Cristais",
        "cep" : "55123000"
    }
}
//6 -  MOSTRA TODOS OS REGISTRO QUE TEM NUMERO NO ENDEREÇO
db.paciente.find({"endereco.numero" : { $exists : true }})
/* 1 */
{
    "_id" : "20",
    "nome" : "Ramiro Santos",
    "telefone" : "87991929394",
    "data_nascimento" : ISODate("1990-07-10T00:00:00.000Z"),
    "deficiencia" : [ 
        "dislalia"
    ],
    "endereco" : {
        "logradouro" : "Rua das cerejeiras",
        "numero" : "19",
        "bairro" : "Lamparina",
        "cidade" : "Cristais",
        "cep" : "55123000"
    }
}
/* 2 */
{
    "_id" : "30",
    "nome" : "Naim Cabral",
    "telefone" : "87999768890",
    "data_nascimento" : ISODate("1997-07-10T00:00:00.000Z"),
    "deficiencia" : [ 
        "afasia", 
        "gagueira"
    ],
    "endereco" : {
        "logradouro" : "Rua dos cactus",
        "numero" : "101",
        "bairro" : "Chuva",
        "cidade" : "Pedra da Lua",
        "cep" : "55000111"
    }
}
// 7 -  MOSTRA O NOME DO PACIENTE E O ENDEREÇO DAQUELE QUE TEM 'AM' EM ALGUMA PARTE DO NOME
db.paciente.find(
    { nome : 
      { $regex : "am.*", $options: "i" } 
    },
        {
          "nome":1,
          "endereco":1,
         }
    );
/* 1 */
{
    "_id" : "20",
    "nome" : "Ramiro Santos",
    "endereco" : {
        "logradouro" : "Rua das cerejeiras",
        "numero" : "19",
        "bairro" : "Lamparina",
        "cidade" : "Cristais",
        "cep" : "55123000"
    }
}
// 8 -  MOSTRA O NOME DO PACIENTE E O ENDEREÇO DAQUELE QUE TEM 'Jo' NO INICIO DO NOME
db.paciente.find(
    { nome : 
        { $regex : /^Jo/i, }
    },
        {
          "nome":1,
          "endereco":1,
         }
    );
/* 1 */
{
    "_id" : 1,
    "nome" : "Josefina Silva"
}
/* 2 */
{
    "_id" : 2,
    "nome" : "José Silva"
}
// 9 - BUSCA O PACIENTE POR DEFICIENCIA
db.paciente.find(
    { "deficiencia": { $eq: "dislalia" } },
    {
        "nome": 1,
        "telefone" :1,
        "endereco.logradouro":1
    }    
   )
/* 1 */
{
    "_id" : "20",
    "nome" : "Ramiro Santos",
    "telefone" : "87991929394",
    "endereco" : {
        "logradouro" : "Rua das cerejeiras"
    }
}
/* 2 */
{
    "_id" : "50",
    "nome" : "Pedro Vinicius Lima",
    "telefone" : "87993128891",
    "endereco" : {
        "logradouro" : "Rua Azul"
    }
}
// 10 - MOSTRA OS PACIENTES QUE MORAM EM DETERMINADA CIDADE E TEM DETERMINADA DEFICIENCIA
db.paciente.find(     
    {$and:
         [
            {"endereco.cidade" : {$eq :"Cristais"}},
            {"deficiencia" : {$eq : "gagueira"}}
         ]
     }                    
)
/* 1 */
{
    "_id" : "40",
    "nome" : "Alberto Assis do Batuque",
    "telefone" : "87991127890",
    "data_nascimento" : ISODate("1998-11-07T00:00:00.000Z"),
    "deficiencia" : [ 
        "rinolalia", 
        "gagueira"
    ],
    "endereco" : {
        "logradouro" : "Avenida de todos",
        "numero" : "232",
        "bairro" : "Alcaçus",
        "cidade" : "Cristais",
        "cep" : "55223000"
    }
}
// 11 - MOSTRA APENAS OS QUE NÃO TEM DETERMINADA DEFICIENCIA
db.paciente.find({"deficiencia" : {$ne : "gagueira"}})
/* 1 */
{
    "_id" : "50",
    "nome" : "Pedro Vinicius Lima",
    "telefone" : "87993128891",
    "data_nascimento" : ISODate("2000-05-27T00:00:00.000Z"),
    "deficiencia" : [ 
        "linguagem tatibite", 
        "dislalia"
    ],
    "endereco" : {
        "logradouro" : "Rua Azul",
        "numero" : "100",
        "bairro" : "Lajes",
        "cidade" : "Cristais",
        "cep" : "55222000"
    }
}
/* 2 */
{
    "_id" : "60",
    "nome" : "Clarice Borges Salgueiro",
    "telefone" : "87991112398",
    "data_nascimento" : ISODate("2011-09-04T00:00:00.000Z"),
    "deficiencia" : [ 
        "afasia"
    ],
    "endereco" : {
        "logradouro" : "Rua do relógio",
        "numero" : "371",
        "bairro" : "México",
        "cidade" : "Cristais",
        "cep" : "55221000"
    }
}
// 12 - MOSTRA OS PACIENTES DE DETERMINADA CIDADE QUE TEM DETERMINADA DEFICIENCIA OU OUTRA.
db.paciente.find(
   {"endereco.cidade": "Cristais" , 
   $or : [
            { "deficiencia" : "afasia " },
            { "deficiencia" : "dislalia" }
         ] 
   }
 )
/* 1 */
{
    "_id" : "20",
    "nome" : "Ramiro Santos",
    "telefone" : "87991929394",
    "data_nascimento" : ISODate("1990-07-10T00:00:00.000Z"),
    "deficiencia" : [ 
        "dislalia"
    ],
    "endereco" : {
        "logradouro" : "Rua das cerejeiras",
        "numero" : "19",
        "bairro" : "Lamparina",
        "cidade" : "Cristais",
        "cep" : "55123000"
    }
}
/* 2 */
{
    "_id" : "50",
    "nome" : "Pedro Vinicius Lima",
    "telefone" : "87993128891",
    "data_nascimento" : ISODate("2000-05-27T00:00:00.000Z"),
    "deficiencia" : [ 
        "linguagem tatibite", 
        "dislalia"
    ],
    "endereco" : {
        "logradouro" : "Rua Azul",
        "numero" : "100",
        "bairro" : "Lajes",
        "cidade" : "Cristais",
        "cep" : "55222000"
    }
}

// 13 - MOSTRA A EVOLUÇÃO DE DETERMINADO PACIENTE
db.evolucao.find(
    {"id_paciente" :"20"  },        
    {      
         "descricao":1,
         "data":1
     });

/* 1 */
{
    "_id" : ObjectId("5ac6a8c9fd62e6e06529ea7d"),
    "descricao" : "O paciente apresenta dificuldades na pronúncia das palavras contendo “R” e “L”",
    "data" : ISODate("2018-01-02T00:00:00.000Z")
}
/* 2 */
{
    "_id" : ObjectId("5ac6a8c9fd62e6e06529ea7e"),
    "descricao" : "O paciente apresenta melhoras na pronuncia do R porém ainda possui dificuldades no L",
    "data" : ISODate("2018-02-05T00:00:00.000Z")
}

// 14 - MOSTRA DESCRIÇÃO DA EVOLUÇÃO E ID DO PACIENTE REGISTRADA EM DETERMINADA DATA
db.evolucao.find({"data" : ISODate("2018-02-21T00:00:00.000Z")},
  {"descricao" :1,
   "id_fono" : 1
  }      
 )
 /* 1 */
{
    "_id" : ObjectId("5ac6a8c9fd62e6e06529ea84"),
    "descricao" : "O paciente diminuiu o uso de linguagem infantil, usando-a ocasionalmente.",
    "id_fono" : "2"
}
/* 2 */
{
    "_id" : ObjectId("5ac6a8c9fd62e6e06529ea85"),
    "descricao" : "O paciente apresenta dificuldade de articular bem as palavras.",
    "id_fono" : "2"
}
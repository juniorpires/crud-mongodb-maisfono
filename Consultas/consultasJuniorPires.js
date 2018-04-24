//1 - Busca todos os pacientes
db.getCollection('paciente').find({})

//2 - Traz o nome e telefone de todos os pacientes
db.getCollection('paciente').find({},{"nome":1,"telefone":1})

//3 - Busca os registros da agenda do fonoaudiologo 3 - Pires
db.getCollection('agenda').find({id_fono:"3"})

//4 - Traz os 5 primeiros pacientes
db.getCollection('paciente').find({}).limit(5);

//5 - Traz todos os registros da agenda exceto os do fonoaudiologo 3 - Pires
db.getCollection('agenda').find({id_fono:{$ne:"3"}})

//6 - Traz todos os pacientes que possuem endereço
db.getCollection('paciente').find({"endereco":{ $exists : true } })

//7 - Traz todos os registros da agenda que ocorreram do começo de 2018 em diante 
db.getCollection('agenda').find({"data":{"$gte" : ISODate("2018-01-01T00:00:01Z")}})

//8 - Traz todas as evoluções do paciente 40 - Alberto
db.getCollection('evolucao').find({id_paciente:"40"})

//9 - Traz todas as evoluções do mês de fevereiro de 2018
db.getCollection('agenda').find({ $and: [{"data":{"$gte" : ISODate("2018-02-01T00:00:01Z")}},{"data":{"$lte" : ISODate("2018-03-01T00:00:01Z")}}]})

//10 - Traz todos os registros da agenda em ordem ascendente
db.getCollection('agenda').find({}).sort({"data":1});

//11 - Traz todos os pacientes que possuem apenas 1 deficiência
db.getCollection('paciente').find({"deficiencia": { $size: 1 }})

//12 - Traz todas as cosultas realizadas do paciente 30 em ordem crescente de data
db.getCollection('agenda').find({"id_paciente":"30","status":"realizada"}).sort({"data":1})

//13 - Traz todas as evoluções que possuem a palavra pronúncia no campo descrição em qualquer posição
db.getCollection('evolucao').find({ descricao : { $regex : "pronúncia.*", $options: "i" } })

//14 - Traz todos os pacientes que tenham o nome começado pela letra J
db.getCollection('paciente').find({ nome : { $regex :  /^J/i, } })

//15 - Traz a descrição de todas as evoluções em ordem crescente de data
db.getCollection('evolucao').find({},{"descricao":1}).sort({"data":1})

//16 - Traz todas as consultas canceladas do fono 1 - Wylianne
db.getCollection('agenda').find({"id_fono":"1","status":"Cancelada"})

//17 - Traz todos os pacientes exceto aqueles que possuem gagueira
db.getCollection('paciente').find({"deficiencia":{"$ne":"gagueira"}})

//18 - Traz todos os pacientes que possuem ou gagueira ou afasia
db.getCollection('paciente').find({ $or:[{"deficiencia":"gagueira"},{"deficiencia":"afasia"}]})

//19 - Traz o nome de todos os pacientes que não possuem endereco
db.getCollection('paciente').find({"endereco":{ $exists : false } },{"nome":1})

//20 - Traz as 3 primeiras evoluções que possuem a palavra melhora na descrição em qualquer posição
db.getCollection('evolucao').find({ descricao : { $regex : "melhora.*", $options: "i" } }).limit(3)

//21 - Traz todos os pacientes maiores de idade 
db.getCollection('paciente').find({"data_nascimento":{"$lte" : ISODate("2000-04-24T00:00:01Z")}})

//22 - Traz todos os pacientes que possuem 1 ou 2 deficiências
db.getCollection('paciente').find({ $or:[{"deficiencia": { $size: 1 }},{"deficiencia":{$size: 2}}]})

//23 - Traz os 5 pacientes após os 3 primeiros
db.getCollection('paciente').find({}).skip(3).limit(4)

//24 - Traz todas as consultas do mês de janeiro feitas ou pelo fonoaudiologo 1 ou o fonoaudiologo 2
db.getCollection('agenda').find({ $and: [{ $or:[{"id_fono":"1"},{"id_fono":2}], "data":{"$gte" : ISODate("2018-01-01T00:00:01Z")}},{"data":{"$lte" : ISODate("2018-02-01T00:00:01Z")}}]})

//25 - Traz todas as evoluções em ordem decrescente de data
db.getCollection('evolucao').find({},{"descricao":1}).sort({"data":-1})


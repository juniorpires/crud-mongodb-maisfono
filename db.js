var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/maisfono")
            .then(conn => global.conn = conn.db("banco"))
            .catch(err => console.log(err))


// CRUD PACIENTE
function findAll(callback){  
     global.conn.collection("paciente").find({}).toArray(callback);
}

function insert(paciente, callback){
    global.conn.collection("paciente").insert(paciente, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("paciente").find(new ObjectId(id)).toArray(callback);
}

function update(id, paciente, callback){
    global.conn.collection("paciente").updateOne({_id:new ObjectId(id)}, paciente, callback);
}

function deleteOne(id, callback){
    global.conn.collection("paciente").deleteOne({_id: new ObjectId(id)}, callback);
}

// CRUD FONO
function findAllFono(callback){  
    global.conn.collection("fonoaudiologo").find({}).toArray(callback);
}

function insertFono(fonoaudiologo, callback){
   global.conn.collection("fonoaudiologo").insert(fonoaudiologo, callback);
}

var ObjectId = require("mongodb").ObjectId;
function findOneFono(id, callback){  
    global.conn.collection("fonoaudiologo").find(new ObjectId(id)).toArray(callback);
}

function updateFono(id, fonoaudiologo, callback){
    global.conn.collection("fonoaudiologo").updateOne({_id:new ObjectId(id)}, fonoaudiologo, callback);
}

function deleteOneFono(id, callback){
    global.conn.collection("fonoaudiologo").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll,insert, findOne, update, deleteOne, 
                   findAllFono, insertFono, findOneFono, updateFono, deleteOneFono
}
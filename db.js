var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/maisfono")
            .then(conn => global.conn = conn.db("fono"))
            .catch(err => console.log(err))

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

module.exports = { findAll,insert, findOne, update, deleteOne }
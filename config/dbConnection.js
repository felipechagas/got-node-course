/* importar o mongodb */
var mongo = require("mongodb").MongoClient;
var assert = require("assert");

const url = "mongodb://mongo:27017";
const dbName = "got";

var connMongoDB = function(dados) {
	mongo.connect(url, function(err, client) {

		assert.equal(null, err);
		console.log("Connected successfully to server");

		const db = client.db(dbName);
		query(db, dados);

		client.close();
	});
};

function query(db, dados) {
	var collection = db.collection(dados.collection);
	switch (dados.operacao) {
		case "inserir":
			collection.insertOne(dados.json, dados.callback);
			break;

		case "autenticar":
			collection.find(dados.json).toArray(dados.callback)
			break;

		case "getJogos":
			collection.find({usuario:dados.json}).toArray(dados.callback)
			break;

		default:
			break;
	}
}

module.exports = function(){
	return connMongoDB;
}
const {MongoClient} = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

module.exports = client;


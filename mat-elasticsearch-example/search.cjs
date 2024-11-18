const { Client } = require("@elastic/elasticsearch");

let elsClient = new Client({ node: "http://localhost:9200" });

console.log("Elasticsearch client loaded successfully!");

console.log(elsClient !== null);

module.exports = { elsClient };

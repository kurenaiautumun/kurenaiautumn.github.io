const { Client } = require("pg");


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'post123',
    port: '5432'
})
client.connect();

module.exports = client;
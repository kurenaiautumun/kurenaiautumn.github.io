const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'post123',
    port: '5432'
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// const query = `
// CREATE TABLE users (
//     email varchar,
//     firstName varchar,
//     lastName varchar,
//     age int
// );
// `;

// const query = `
// INSERT INTO users (email, firstName, lastName, age)
// VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
// `;

const query = `
SELECT *
FROM users
`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(res.rows)
    console.log('query completed');
    client.end();
});
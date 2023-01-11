const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "napoleonskeBitke",
    password: "bazepodataka",
    port: 5432,
});

module.exports = pool;
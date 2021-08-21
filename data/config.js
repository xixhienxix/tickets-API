const mysql = require('mysql');

const config = {
    connectionLimit:10,
    host:'localhost',
    user:'xixzeroxix',
    password:'34nj6efH',
    database:'tickets_univer',
    port:3306
}

//create mysql pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;
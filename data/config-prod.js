const mysql = require('mysql');

const config = {
    connectionLimit:10,
    host:'tickets-univer.c89gtdswjvzb.us-east-1.rds.amazonaws.com',
    user:'xixzeroxix',
    password:'34nj6efH',
    database:'tickets_univer',
    port:3306
}

//create mysql pool
const pool_prod = mysql.createPool(config);

// Export the pool
module.exports = pool_prod;
const express = require("express");
const bodyParser = require("body-parser");
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
const pool = mysql.createPool(config);
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//RUTAS

app.get('/', (request, response) => {
  response.send({
      message: 'Bienvenido a la API!'
  });
});

///

// app.routes require("./routes/tickets.routes");

// set port, listen for requests
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
module.exports = app;

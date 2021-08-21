// Load the MySQL pool connection
const pool_prod = require('../data/config-prod');
const pool = require('../data/config');
const express = require('express');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
  // Use Node.js body parsing middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('views', 'views');


// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//    res.render('index');
// });

// Route the app
// const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Bienvenido a la API!'
        });
    });

    app.get('/api/campanas', (request, response) => {
        pool_prod.query('SELECT * FROM campanas', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/api/campana/:id', (request, response) => {
        const id = request.params.id;

        pool_prod.query('SELECT * FROM campanas WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    //TICKETS
    app.get('/api/tickets', (request, response) => {
        pool_prod.query('SELECT * FROM tickets', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/api/tickets/:id', (request, response) => {
        const id = request.params.id;

        pool_prod.query('SELECT * FROM tickets WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/api/tickets', (req, response) => {
        const fecha_Inicio=new Date(req.body.Fecha_Inicio)
        const fecha_Fin=new Date(req.body.Fecha_Fin)
        const fecha_Seguimeinto=new Date(req.body.Fecha_Seguimeinto)

        const fecha_InicioSQL = fecha_Inicio.toJSON().slice(0, 19).replace('T', ' ');
        const fecha_FinSQL = fecha_Fin.toJSON().slice(0, 19).replace('T', ' ');
        const fecha_SeguimientoSQL = fecha_Seguimeinto.toJSON().slice(0, 19).replace('T', ' ');

        var sql = ('INSERT INTO tickets (Area,Descripcion,'
        +'Estatus,Responsable,Supervisado,Creado_Por,Fecha_Inicio,'
        +'Fecha_Fin,Fecha_Seguimiento,Hora_Abierto,Color)'
        +'VALUES ?');

        var values = [
            [req.body.Area,
            req.body.Descripcion,req.body.Estatus,
            req.body.Responsable,req.body.Supervisado,
            req.body.Creado_Por,fecha_InicioSQL,
            fecha_FinSQL,fecha_SeguimientoSQL,
            req.body.Hora_Abierto,req.body.Color],
          ];

          pool_prod.query(sql,[values], function (err, result) {
          if (err){

            response.status(400).json({
                message: err
              });
          } else

          response.status(201).json({
            result
          });
          console.log("1 record inserted");
        });
    });

    // Update an existing user
    app.put('/api/tickets', (request, response) => {
        const id = request.body.ID;
        const color = request.body.Color;
        var sql = ('UPDATE tickets SET Color = ? WHERE id = '+id+'');
        var values = request.body.Color

        pool_prod.query(sql,[values], function (err, result) {
            if (err){
  
              response.status(400).json({
                  message: err
                });
            } else
  
            response.status(201).json({
              result
            });
            console.log("1 record inserted");
          });
    });
     // Complete Ticketr
     app.post('/api/reportes/tickets/:id', (request, response) => {
        console.log("competadas")
        const id = request.params.id;
        var sql = ('UPDATE tickets SET Estatus = ? WHERE id = '+id+'');
        var sql2 = ('UPDATE tickets SET Color = ? WHERE id = '+id+'');
        var values = '#FFFFFF'
        var values1 = 0

        pool_prod.query(sql,[values1], function (err, result) {
            if (err){
                    console.log(err)
            } else
            console.log("estatus Actualizado ID: ",id );
          });
          pool.query(sql2,[values], function (err, result) {
            if (err){
                    console.log(err)
            } else
            console.log("Tarea completada ID: ",id);
            response.status(201).json({
                result
          });
        });  
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool_prod.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
    //FILE  UPLOAD

    app.get('/api/upload',multipartMiddleware,(req,res)=>{

        res.json({"message":"Archivo Cargado Correctamente"})
    })

    app.post('/api/signup',(req,res)=>{
        const user = req.body.password
        const email = req.body.email

        var sql = ('INSERT INTO tickets (Area,Descripcion,'
        +'Estatus,Responsable,Supervisado,Creado_Por,Fecha_Inicio,'
        +'Fecha_Fin,Fecha_Seguimiento,Hora_Abierto,Color)'
        +'VALUES ?');

        var values = [
            [req.body.Area,
            req.body.Descripcion,req.body.Estatus,
            req.body.Responsable,req.body.Supervisado,
            req.body.Creado_Por,fecha_InicioSQL,
            fecha_FinSQL,fecha_SeguimientoSQL,
            req.body.Hora_Abierto,req.body.Color],
          ];

          pool_prod.query(sql,[values], function (err, result) {
          if (err){

            response.status(400).json({
                message: err
              });
          } else

          response.status(201).json({
            result
          });
          console.log("1 record inserted");
        });
    })

    
    // app.use(function(req, res) {
    //     res.redirect('/')
    // });
//}

// Export the router
//module.exports = router;
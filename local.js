const app = require('./server.js');
const port = process.env.PORT || 8000;
const routes = require('./routes/routes')

routes(app);

// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});


const awsServerlessExpress = require('aws-serverless-express');
const app = require('./routes/routes');
const server = awsServerlessExpress.createServer(app)


module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);

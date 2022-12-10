
const config = require('config');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const routes = require('./routes')
const app = express();
const db = require('../config/database');

app.use(routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;


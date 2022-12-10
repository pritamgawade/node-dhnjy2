'use strict'

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes.js'];

swaggerAutogen(outputFile, endpointsFiles);

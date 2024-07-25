const swaggerAutogen = require('swagger-autogen')();
//const swaggerDocument = require('./swagger.json');


const doc = {
    info: {
        title: 'Ward API',
        description: 'API for managing Asokoro Ward data',
        version: '1.0.0'
    },
    host: 'ward-b32h.onrender.com',
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        oauth2: {
            type: 'oauth2',
            authorizationUrl: 'https://ward-b32h.onrender.com/login',
        }
    },
    
};






const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

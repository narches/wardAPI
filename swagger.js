const swaggerAutogen = require('swagger-autogen')();
const swaggerDocument = require('./swagger.json');





const doc = {
    swagger: '2.0',
    info: {
        title: 'Ward API',
        description: 'API for managing ward data',
        version: '1.0.0'
    },
    host: 'wardapi.onrender.com',
    basePath: '/api',
    schemes: ['http', 'https'],
    securityDefinitions: {
        oauth2: {
            type: 'oauth2',
            authorizationUrl: 'https://your-auth-server.com/oauth/authorize',
            flow: 'implicit',
            scopes: {
                'openid': 'OpenID Connect scope',
                'profile': 'Profile scope',
                'email': 'Email scope'
            }
        }
    },
    security: [
        {
            oauth2: ['openid', 'profile', 'email']
        }
    ],
    paths: {}
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Rest',
    description: 'documentacao dos endpoints do Condominio'
  },
  host: '192.168.0.104:3000'
};

const outputFile = './src/swagger/swagger.json';
const endpointsFiles = ['./src/routes/router.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
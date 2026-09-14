import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API de Mascotas',
        description: 'Documentación de la API para la gestión de mascotas',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js']; // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index'); // Inicia el servidor automáticamente
});
import swaggerAutogen from 'swagger-autogen';
import { exec } from 'child_process';

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
    exec('node src/index.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al iniciar el servidor: ${error.message}`);
            return;
        }
        if (stderr) console.error(stderr);
        console.log(stdout);
    });
});
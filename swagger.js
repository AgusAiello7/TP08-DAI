import swaggerAutogen from 'swagger-autogen';
import { exec } from 'child_process';

const doc = {
    info: {
        title: 'API de Provincias - TP08 DAI',
        description: 'API propia (Node.js + Express + PostgreSQL) para la gestión de un catálogo de provincias: alta, baja, modificación total/parcial y consulta.',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    definitions: {
        Province: {
            id: 1,
            name: "Buenos Aires",
            full_name: "Provincia de Buenos Aires",
            latitude: -34.6,
            longitude: -58.4,
            display_order: 1
        },
        ProvinceInput: {
            name: "Buenos Aires",
            full_name: "Provincia de Buenos Aires",
            latitude: -34.6,
            longitude: -58.4,
            display_order: 1
        },
        ProvincePartial: {
            name: "Buenos Aires"
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js']; // Cambia este archivo según el punto de entrada de tu API

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    exec('node src/index.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al iniciar el servidor: ${error.message}`);
            return;
        }
        if (stderr) console.error(stderr);
        console.log(stdout);
    });
});
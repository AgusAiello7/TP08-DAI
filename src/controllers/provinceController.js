import { Router } from 'express';
import ProvinceService from '../services/provinces-services.js';
import LogHelper from '../helpers/log-helper.js';

const router = Router();
const svc = new ProvinceService();

router.get('/', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Obtiene todas las provincias registradas.'
        #swagger.responses[200] = {
            description: 'Listado de provincias',
            schema: [ { $ref: '#/definitions/Province' } ]
        }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const respuesta = await svc.getAllAsync();
        res.status(200).json(respuesta);
    } catch (error) {
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Obtiene una provincia específica según su id.'
        #swagger.parameters['id'] = { in: 'path', description: 'ID de la provincia', required: true, type: 'integer' }
        #swagger.responses[200] = { description: 'Provincia encontrada', schema: { $ref: '#/definitions/Province' } }
        #swagger.responses[404] = { description: 'No se encontró la provincia' }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const respuesta = await svc.getByIdAsync(req.params.id);
        if (respuesta) {
            res.status(200).json(respuesta);
        } else {
            res.status(404).send("No se encontró la provincia");
        }
    } catch (error) {
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post('/', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Crea una nueva provincia. Requiere al menos "name" (mínimo 3 caracteres).'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Datos de la provincia a crear',
            required: true,
            schema: { $ref: '#/definitions/ProvinceInput' }
        }
        #swagger.responses[201] = { description: 'Provincia creada', schema: { $ref: '#/definitions/Province' } }
        #swagger.responses[400] = { description: 'Nombre faltante o con menos de 3 caracteres' }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const provinciaIngresada = req.body;
        const respuesta = await svc.createAsync(provinciaIngresada);

        if (respuesta) {
            res.status(201).json(respuesta);
        } else {
            res.status(400).send("Request incorrecta");
        }
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).send(error.message);
        }
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

// NUEVO: POST bulk - crea varias provincias a la vez.
// Ajustá el nombre del método del service (createBulkAsync) según cómo lo implementes ahí.
router.post('/bulk', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Crea varias provincias en una sola operación, a partir de un array. Si alguna no pasa la validación, se corta y se devuelve ese error.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Array de provincias a crear',
            required: true,
            schema: [ { $ref: '#/definitions/ProvinceInput' } ]
        }
        #swagger.responses[201] = {
            description: 'Provincias creadas',
            schema: [ { $ref: '#/definitions/Province' } ]
        }
        #swagger.responses[400] = { description: 'Se esperaba un array no vacío, o alguna provincia no pasó la validación' }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const provinciasIngresadas = req.body; // se espera un array de provincias

        if (!Array.isArray(provinciasIngresadas) || provinciasIngresadas.length === 0) {
            return res.status(400).send("Se esperaba un array de provincias no vacío");
        }

        const respuesta = await svc.createBulkAsync(provinciasIngresadas);

        if (respuesta) {
            res.status(201).json(respuesta);
        } else {
            res.status(400).send("Request incorrecta");
        }
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).send(error.message);
        }
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.put('/', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Reemplaza una provincia existente por completo. El id se envía dentro del body (no en la ruta).'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Provincia completa, incluyendo el id',
            required: true,
            schema: { $ref: '#/definitions/Province' }
        }
        #swagger.responses[200] = { description: 'Provincia actualizada', schema: { $ref: '#/definitions/Province' } }
        #swagger.responses[400] = { description: 'Nombre faltante o con menos de 3 caracteres' }
        #swagger.responses[404] = { description: 'Provincia no encontrada' }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const provinciaIngresada = req.body;
        const respuesta = await svc.updateAsync(
            provinciaIngresada,
            provinciaIngresada.id
        );

        if (respuesta) {
            res.status(200).json(respuesta);
        } else {
            res.status(404).send("Provincia no encontrada");
        }
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).send(error.message);
        }
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

// NUEVO: PATCH /:id - actualización parcial.
// Ajustá el nombre del método del service (updatePartialAsync) según cómo lo implementes ahí.
router.patch('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Actualiza parcialmente una provincia existente: solo modifica los campos enviados en el body.'
        #swagger.parameters['id'] = { in: 'path', description: 'ID de la provincia', required: true, type: 'integer' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Campos a modificar (no es necesario enviarlos todos)',
            required: true,
            schema: { $ref: '#/definitions/ProvincePartial' }
        }
        #swagger.responses[200] = { description: 'Provincia actualizada', schema: { $ref: '#/definitions/Province' } }
        #swagger.responses[400] = { description: 'Nombre inválido (si se envía y no cumple la validación)' }
        #swagger.responses[404] = { description: 'Provincia no encontrada' }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const cambiosParciales = req.body;
        const respuesta = await svc.updatePartialAsync(
            req.params.id,
            cambiosParciales
        );

        if (respuesta) {
            res.status(200).json(respuesta);
        } else {
            res.status(404).send("Provincia no encontrada");
        }
    } catch (error) {
        if (error.statusCode === 400) {
            return res.status(400).send(error.message);
        }
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.delete('/:id', async (req, res) => {
    /*
        #swagger.tags = ['Provinces']
        #swagger.description = 'Elimina una provincia según su id.'
        #swagger.parameters['id'] = { in: 'path', description: 'ID de la provincia', required: true, type: 'integer' }
        #swagger.responses[200] = { description: 'Provincia eliminada' }
        #swagger.responses[404] = { description: 'Provincia no encontrada' }
        #swagger.responses[500] = { description: 'Error interno del servidor' }
    */
    try {
        const provinceID = req.params.id;
        const respuesta = await svc.deleteByIdAsync(provinceID);

        if (respuesta) {
            res.status(200).json(respuesta);
        } else {
            res.status(404).send("Provincia no encontrada");
        }
    } catch (error) {
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

export default router;
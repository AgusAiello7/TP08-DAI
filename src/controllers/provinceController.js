import { Router } from 'express';
import ProvinceService from '../services/provinces-services.js';
import LogHelper from '../helpers/log-helper.js';

const router = Router();
const svc = new ProvinceService();

router.get('/', async (req, res) => {
    try {
        const respuesta = await svc.getAllAsync();
        res.status(200).json(respuesta);
    } catch (error) {
        LogHelper.logError(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get('/:id', async (req, res) => {
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
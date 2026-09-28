import { Router } from "express";
import ProvinceService from "../services/provinces-services.js";
import LogHelper from '../helpers/log-helper.js';

const router = Router()
const svc = new ProvinceService()

router.post("/reset/" , async (req, res) => {
    /*
        #swagger.tags = ['Admin']
        #swagger.description = 'Resetea los datos de la tabla de provincias a su estado inicial (uso administrativo).'
        #swagger.responses[201] = {
            description: 'Datos reseteados correctamente',
            schema: [ { $ref: '#/definitions/Province' } ]
        }
        #swagger.responses[400] = { description: 'Error en la request' }
    */
    try{
        const respuesta = await svc.resetAsync()
        if(respuesta){
            res.status(201).json(respuesta.rows)
        } else {
            res.status(400).send("Error en la request")
        }
    }
    catch (error) {
        res.status(error.response.status).send("Error interno")
        LogHelper.logError(error)
    }
})

export default router
import {Router} from 'express'; 
import ProvinceService from '../services/provinces-services.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    try{
        const respuesta = await svc.getAllProvinces();
        if(respuesta){
            res.status(200).json(respuesta)
        } else {
            res.status(404).send("Ninguna provincia encontrada")
        }
    }
    catch(error){
        console.error(error)
        res.status(500).send("Error del servidor")
    }

})

router.get(':id', async (req, res) => {
    const provinceID = req.params.id
    const respuesta = svc.getProvinceByID(provinceID)
    if(respuesta){
        res.status(200).json(respuesta)
    } else {
        res.status(500).send("Error interno")
    }
})

router.post('', async (req, res) => {
    try{
        const datosProvincia = req.body
        const respuesta = svc.createProvince(datosProvincia)
        if(respuesta){
            res.status(201).json(respuesta)
        } else {
            res.status(500).send("Error interno")
        }
    }
    catch(error){
        res.status(400).send("Error en la request")
    }
})

export default router
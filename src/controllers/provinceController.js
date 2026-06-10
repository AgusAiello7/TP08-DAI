import {Router} from 'express'; 
import ProvinceService from '../services/provinces-services.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    const respuesta = await svc.getAllAsync();
    if(respuesta){
        res.status(200).json(respuesta)
    } else {
        console.error(error)
        res.status(500).send("Error del servidor")
    }    
})

router.get(':id', async (req, res) => {
    const respuesta = await svc.getByIdAsync(req.params.id);
    if(respuesta){
        res.status(200).json(respuesta)
    } else {
        console.error(error)
        res.status(500).send("Error del servidor")
    }    
})

router.post('', async (req, res) => {
    const respuesta = await svc.createAsync();
    if(respuesta){
        res.status(200).json(respuesta)
    } else {
        console.error(error)
        res.status(500).send("Error del servidor")
    }    
})

router.put('', async (req, res) => {
try{
    const provinciaIngresada = req.body
    const respuesta = svc.updateAsync(provinciaIngresada)
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

router.delete('/:id', async (req, res) => {
const provinceID = req.params.id
    const respuesta = svc.deleteByIdAsync(provinceID)
    if(respuesta){
        res.status(200).json(respuesta)
    } else {
        res.status(500).send("Error interno")
    }
})

export default router
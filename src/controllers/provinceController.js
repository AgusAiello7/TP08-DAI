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

router.get('/:id', async (req, res) => {
    try{
        const respuesta = await svc.getByIdAsync(req.params.id);
        if(respuesta){
            res.status(200).json(respuesta)
        } else {
            console.error(error)
            res.status(404).send("No se encontró la provincia")
        }    
    } catch (error) {
        res.status(500).send("Error interno de servidor; " + error)
    }
})

router.post('', async (req, res) => {
    try{
        const provinciaIngresada = req.body
        const respuesta = await svc.createAsync(provinciaIngresada)
        if(respuesta){
            res.status(201).json(respuesta)
        } else {
            res.status(400).send("Request incorrecta")
        }
    } catch (error) {
        res.status(500).send("Error interno de servidor; " + error)
    }
})

router.put('', async (req, res) => {
try{
    const provinciaIngresada = req.body
    const respuesta = svc.updateAsync(provinciaIngresada)
     if(respuesta){
            res.status(201).json(respuesta)
        } else {
            res.status(400).send("Error en la request")
        }
    } catch(error){
        res.status(500).send("Error interno del servidor; Error: " + error)
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
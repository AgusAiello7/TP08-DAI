import {Router} from 'express'; 
import ProvinceService from '../services/provinces-services.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    const respuesta = svc.getAllProvinces();
    if(respuesta){
        res.status(200).json(respuesta)
    } else {
        res.status(500).send("Error interno")
    }
})

router.get(':id', async (req, res) => {
    const provinceID = req.params.id
    getProvinceByID
})
export default router
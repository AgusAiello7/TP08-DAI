import ProvinceRepository from '../repositories/province-repository.js' 

export default class ProvinceService {

    getAllProvinces = async () => {
        const repo = new ProvinceRepository()
        const respuesta = repo.getAllAsync();
    }

    getProvinceByID = async () => {
        return "Llego al servicio de getProvinceByID"
    }
}
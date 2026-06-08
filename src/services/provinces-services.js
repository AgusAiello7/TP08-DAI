import ProvinceRepository from '../repositories/province-repository.js' 

export default class ProvinceService {

    getAllAsync = async () => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getAllAsync()
        return returnArray
    }

    getByIdAsync = async () => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getByIdAsync()
        return returnArray
    }

    createAsync = async () => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.createAsync()
    }
}
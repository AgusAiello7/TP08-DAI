import ProvinceRepository from '../repositories/province-repository.js' 

export default class ProvinceService {

    getAllAsync = async () => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getAllAsync()
        return returnArray
    }

    getByIdAsync = async (id) => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.getByIdAsync(id)
        return returnArray
    }

    createAsync = async (provincia) => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.createAsync(provincia)
        return returnArray
    }

    updateAsync = async (provincia, id) => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.updateAsync(provincia, id)
        return returnArray
    }

    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.deleteByIdAsync(id)
        return returnArray
    }
    }
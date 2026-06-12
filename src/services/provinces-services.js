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
    this.validateProvince(provincia);
    const repo = new ProvinceRepository();
    const returnArray = await repo.createAsync(provincia);
    return returnArray;
}

    updateAsync = async (provincia, id) => {
    this.validateProvince(provincia);
    const repo = new ProvinceRepository();
    const returnArray = await repo.updateAsync(provincia, id);
    return returnArray;
}

    deleteByIdAsync = async (id) => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.deleteByIdAsync(id)
        return returnArray
    }

    validateProvince = (province) => {

    if (!province.name || province.name.trim() === '') {

        const error = new Error('El nombre es obligatorio');
        error.statusCode = 400;
        throw error;
    }

    if (province.name.trim().length < 3) {

        const error = new Error('El nombre debe tener al menos 3 caracteres');
        error.statusCode = 400;
        throw error;
    }
}

    resetAsync = async() => {
        const repo = new ProvinceRepository()
        const returnArray = await repo.resetAsync()
        return returnArray
    }

}

    
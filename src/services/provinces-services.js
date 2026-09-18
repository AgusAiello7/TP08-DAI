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

    // NUEVO: crea varias provincias en secuencia, reutilizando createAsync (valida cada una).
    // Si alguna falla la validación (400), se corta y se propaga ese error tal cual.
    createBulkAsync = async (provincias) => {
        const resultados = [];
        for (const provincia of provincias) {
            const creada = await this.createAsync(provincia);
            resultados.push(creada);
        }
        return resultados;
    }

    updateAsync = async (provincia, id) => {
        this.validateProvince(provincia);
        const repo = new ProvinceRepository();
        const returnArray = await repo.updateAsync(provincia, id);
        return returnArray;
    }

    // NUEVO: actualización parcial. Trae la provincia existente, la mezcla con los
    // campos recibidos en el body, valida el resultado y lo guarda con updateAsync.
    updatePartialAsync = async (id, cambiosParciales) => {
        const repo = new ProvinceRepository();
        const existente = await repo.getByIdAsync(id);

        if (!existente) {
            return null; // el controller lo traduce a 404
        }

        const provinciaActualizada = { ...existente, ...cambiosParciales };
        this.validateProvince(provinciaActualizada);

        const returnArray = await repo.updateAsync(provinciaActualizada, id);
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
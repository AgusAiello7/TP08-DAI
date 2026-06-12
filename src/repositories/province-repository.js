import config from "../configs/dbconfig.js"
import pkg from 'pg'
import LogHelper from '../helpers/log-helper.js';
const {Client} = pkg;

export default class ProvinceRepository{
    getAllAsync = async () => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        const sql = 'SELECT * FROM provinces';
        const result = await client.query(sql);
        returnArray = result.rows;
    } catch(error){
        LogHelper.logError(error);
        throw error;
    }
      finally{
        await client.end();
    }

    return returnArray;
    
}
  getByIdAsync = async (id) => {
    let returnArray = null;
    const client = new Client(config);

    try {
        await client.connect();
        const sql = 'SELECT * FROM provinces WHERE id = $1';
        const values = [id];
        const result = await client.query(sql, values);
        returnArray = result.rows[0];
    } catch (error) {
        LogHelper.logError(error);
        throw error;

    } finally {
        await client.end();
    }
    return returnArray;
}

    createAsync = async (province) => {
    let returnArray = null;
    const client = new Client(config);

    try {

        await client.connect();
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [ province.name, province.fullname, province.latitude, province.longitude, province.displayorder ];
        const result = await client.query(sql, values);
        returnArray = result.rows[0];

    } catch (error) {
        LogHelper.logError(error);
        throw error;

    } finally {
        await client.end();

    }
    return returnArray;
}

  updateAsync = async (province, id) => {
    let returnArray = null;
    const client = new Client(config);
    try {

        await client.connect();
        const sql = `UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4 , display_order = $5 WHERE id = $6  RETURNING *`;

        const values = [province.name, province.fullname, province.latitude, province.longitude, province.displayorder, id ];
        const result = await client.query(sql, values);
        returnArray = result.rows[0];

    } catch (error) {

        LogHelper.logError(error);
        throw error;

    } finally {
        await client.end();
    }
    return returnArray;
}

    deleteByIdAsync = async (id) => {
    let returnArray = null;
    const client = new Client(config);
    try {
        await client.connect();
        const sql = ` DELETE FROM provinces WHERE id = $1 RETURNING * `;
        const values = [id];
        const result = await client.query(sql, values);
        returnArray = result.rows[0];

    } catch (error) {
        LogHelper.logError(error);
        throw error;

    } finally {
        await client.end();
    }
    return returnArray;
}

    resetAsync = async () => {
        let returnArray = null;
        const client = new Client(config)
        try{
            await client.connect()
            const deleteQuerySQL = "DELETE from provinces"
            await client.query(deleteQuerySQL)
            const valuesInsert = "('Buenos Aires', -36.6769, -60.5588, 1, 'Buenos Aires'), ('Catamarca', -28.4696, -65.7852, 2, 'Catamarca'), ('Chaco', -26.3864, -60.7653, 3, 'Chaco'), ('Chubut', -43.7886, -68.5264, 4, 'Chubut'), ('Córdoba', -31.3993, -64.2644, 5, 'Córdoba'), ('Corrientes', -27.4692, -58.8306, 6, 'Corrientes'), ('Entre Ríos', -32.0589, -59.2013, 7, 'Entre Ríos'), ('Formosa', -24.8958, -60.4549, 8, 'Formosa'), ('Jujuy', -23.3193, -65.7643, 9, 'Jujuy'), ('La Pampa', -37.1316, -65.4467, 10, 'La Pampa'), ('La Rioja', -29.4131, -66.8558, 11, 'La Rioja'), ('Mendoza', -34.7876, -68.4382, 12, 'Mendoza'), ('Misiones', -27.4269, -55.9467, 13, 'Misiones'), ('Neuquén', -38.6418, -70.1186, 14, 'Neuquén'), ('Río Negro', -40.8261, -63.0000, 15, 'Río Negro'), ('Salta', -24.7998, -65.4117, 16, 'Salta'), ('San Juan', -30.8654, -68.8895, 17, 'San Juan'), ('San Luis', -33.7577, -66.0281, 18, 'San Luis'), ('Santa Cruz', -48.8155, -69.9558, 19, 'Santa Cruz'), ('Santa Fe', -30.7069, -60.9500, 20, 'Santa Fe'), ('Santiago del Estero', -27.7834, -64.2642, 21, 'Santiago del Estero'), ('Tierra del Fuego, Antártida e Islas del Atlántico Sur', -54.4296, -67.1955, 22, 'Tierra del Fuego'), ('Tucumán', -26.8222, -65.2226, 23, 'Tucumán'), ('Ciudad Autónoma de Buenos Aires', -34.6037, -58.3816, 24, 'CABA')"
            const insertQuerySQL = `INSERT INTO provinces (full_name, latitude, longitude, display_order, name) VALUES ${valuesInsert} RETURNING *`
            returnArray = await client.query(insertQuerySQL)
            return returnArray
        } catch (error) {
            throw error;
        } finally {
            await client.end()
        }
    }
}

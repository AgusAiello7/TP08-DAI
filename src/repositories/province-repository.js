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
        const values = [ province.name, province.full_name, province.latitude, province.longitude, province.display_order ];
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

        const values = [province.name, province.full_name, province.latitude, province.longitude, province.display_order, id ];
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
}

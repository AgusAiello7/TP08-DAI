import config from "../configs/dbconfig.js"
import pkg from 'pg'
const { Client, Pool} = pkg;

export default class ProvinceRepository{
    getAllAsync = async () => {
        console.log(config.port)
        let returnArray = null;
        const client = new Client (config);
        try{
            await client.connect();
            const sql = 'SELECT * FROM provinces';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows
        }
        catch(error){
            console.log("Error en el repo" + error)
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let returnArray = null;
        const client = new Client (config)
        console.log("ID:" + id)
        await client.connect();
        const sql = `SELECT * FROM provinces WHERE id = ${id}`
        const result = await client.query(sql)
        await client.end()
        returnArray = result.rows[0]
        return returnArray;
    }

    createAsync = async (province) => {
        let returnArray = null;
        const client = new Client (config)
        await client.connect();
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${province.name}', '${province.fullname}', ${province.latitude}, ${province.longitude}, ${province.displayorder}) RETURNING *`
        const result = await client.query(sql)
        console.log(result)
        await client.end()
        returnArray = result.rows
        return returnArray;
    }
    
    updateAsync = async (province) => {
        let returnArray = null
        const client = new Client(config)
        await client.connect;
        const querySQL = (`UPDATE provinces (name, full_name, latitude, longitud, display_order) SET ('${province.name}, '${province.fullname}, ${province.latitude}. ${province.longitude}, ${province.displayorder}') WHERE id = ${province.id} RETURNING *`)
        returnArray = client.query(querySQL)
        return returnArray
    }
    deleteByIdAsync = async (id) => {
        let returnArray = null
        const client = new Client(config)
        await client.connect;
        const querySQL = (`DELETE FROM provinces WHERE id = ${id} RETURNING *`)
        returnArray = client.query(querySQL)
        return returnArray 
    }

}
import config from "../configs/dbconfig.js"
import pkg from 'pg'
const { Client, Pool} = pkg;

export default class ProvinceRepository{
    getAllAsync = async () => {
        let returnArray = null;
        try{
            const client = new Client (DBConfig);
            await client.connect();
            const sql = 'SELECT * FROM Provinces';
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
        const client = new Client (DBConfig)
        try{
            await client.connect();
            const sql = `SELECT * FROM Provinces WHERE id = ${id}`
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        }
        catch (error){
            console.log("Error en el repo" + error)
        }
        return returnArray;
    }

    createAsync = async (province) => {
        let returnArray = null;
        const client = new Client (DBConfig)
        try{
            await client.connect();
            const sql = `INSERT INTO Provinces (name, full_name, latitude, longitude, display_order) VALUES ${province.name}, ${province.fullname}, ${province.latitude}, ${province.longitude}, ${province.displayorder})`
            const result = await client.query(sql)
            await client.end()
            returnArray = result.rows
        }
        catch (error){
            console.log("Error en el repo" + error)
        }
        return returnArray;
    }
    
    updateAsync = async (entity) => {}
    deleteByIdAsync = async (id) => {}

}
import config from "../configs/dbconfig.js"
import pkg from 'pg'
const { Client, Pool} = pkg;
export default class ProvinceRepository{
    getAllAsync = async () => {
        let returnArray = null;
        const client = new Client (DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM Provinces';
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
                console.log(error)
            }
        return returnArray;
        }
    }

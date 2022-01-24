require('dotenv').config()
const { Client } = require('pg');

const getDataFromDataBase = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            port: process.env.PGPORT
        })
        await client.connect()
        const res = await client.query(`SELECT count(id) FROM public.\"USER_DATA_TEST\" WHERE last_login = (SELECT MAX(last_login) from public."USER_DATA_TEST")`);
        const result = await res.rows
        client.end()
        return result
    } catch (error) {
        console.error(error)
    }
}

getDataFromDataBase()
    .then(result => console.log(result))
/*
require('dotenv').config()

const configEscola = {
    user: process.env.SQL_USER,
    password: process.env.SQL_SENHA,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_BD,
    options: {
        trustServerCertificate: true
    }
}
*/

// config teste em casa
const config = {
    user: 'BD21241',
    password: 'aclmp15042020',
    server: 'localhost',
    database: 'BD21241',
    options: {
        trustServerCertificate: true
    }
}

module.exports = config
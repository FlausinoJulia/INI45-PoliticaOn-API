require('dotenv').config()

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_SENHA,
    server: process.env.SQL_SERVIDOR,
    database: process.env.SQL_BD,
    options: {
        trustServerCertificate: true
    }
}

module.exports = config
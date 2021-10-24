require('dotenv').config();


const psql = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: encodeURIComponent(process.env.DB_USER),
    password: encodeURIComponent(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
}

const production = {
    isProd: process.env.NODE_ENV === 'production',
    dbUrl: process.env.DATABASE_URL,
}

const mysql = {
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT | 3306
}

const server = {
    port: process.env.PORT,
};


module.exports = { server, psql, mysql, production };
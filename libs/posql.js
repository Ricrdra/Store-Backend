const {Client} = require("pg");
const config = require("../config/index");

async function getConnection() {
    const client = new Client({
        host: config.psql.host,
        port: config.psql.port,
        user: config.psql.user,
        password: config.psql.password,
        database: config.psql.database
    });
    await client.connect();
    return client;
}

module.exports = getConnection;



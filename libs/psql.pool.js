const { Pool } = require("pg");
const config = require("../config/index");
let URI = '';

if (config.production.isProd) {
    URI = config.production.dbUrl;
} else {
    URI = `postgres://${config.psql.user}:${config.psql.password}@${config.psql.host}:${config.psql.port}/${config.psql.database}`;
}


const pool = new Pool({ connectionString: URI });

module.exports = pool;
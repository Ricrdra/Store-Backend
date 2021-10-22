const config = require("./../config/index");
// const USER = encodeURIComponent(config.mysql.user);
// const PASSWORD = encodeURIComponent(config.mysql.password);
const URI = `postgres://${config.psql.user}:${config.psql.password}@${config.psql.host}:${config.psql.port}/${config.psql.database}`;

module.exports = {
    development: {
        url: URI,
        dialect: 'postgres',
    },
    production: {
        url: URI,
        dialect: 'postgres',
    }
}

//Requiring important packages for sequelize
const { Sequelize } = require('sequelize');
//Import function which will setup models
const setupModels = require('./../db/models');
//Import env configuration
const config = require('../config/index.js');
//Setting up db config, can be mysql or psl or any sql db

let URI;
let options = {
    dialect: 'postgres',
};
if (config.production.isProd) {
    URI = config.production.dbUrl
    options.logging = false;
    options.ssl = {
        rejectUnauthorized: false
    }
} else {
    URI = `postgres://${config.psql.user}:${config.psql.password}@${config.psql.host}:${config.psql.port}/${config.psql.database}`;
    options.logging = true;

}




//Creating a sequelize instance and giving config
const sequelize = new Sequelize(URI, options);

//Config models with sequelize
setupModels(sequelize);
//Exporting sequelize

module.exports = sequelize;
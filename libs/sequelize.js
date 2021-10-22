//Requiring important packages for sequelize
const {Sequelize} = require('sequelize');
//Import function which will setup models
const setupModels = require('./../db/models');
//Import env configuration
const config = require('../config/index.js');
//Setting up db config, can be mysql or psl or any sql db
const URI = `postgres://${config.psql.user}:${config.psql.password}@${config.psql.host}:${config.psql.port}/${config.psql.database}`;

//Creating a sequelize instance and giving config
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

//Config models with sequelize
setupModels(sequelize);
//Exporting sequelize

module.exports = sequelize;

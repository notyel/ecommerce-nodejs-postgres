const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbDatabase}?sslmode=require`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
});

setupModels(sequelize);

module.exports = sequelize;

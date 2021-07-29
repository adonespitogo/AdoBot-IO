var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var config = require('../db/config');
var sequelize;

if (env === 'development') {

  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,

    {
      host: config.development.host,
      dialect: config.development.dialect,
      pool: {
        max: 5,
        min: 1,
        idle: 10000
      }
    });
} else {
  //production
  sequelize = new Sequelize(process.env[config.production.use_env_variable], {
    pool: config.production.pool
  });
}

module.exports = sequelize;

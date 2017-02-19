var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var config = require('./config');
var sequelize;

if (env === 'development') {

  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,

    {
      host: config.development.host,
      dialect: 'mysql',
      dialectOptions: {
        charset: config.defaults.charset,
        collate: config.defaults.collate
      },
      charset: config.defaults.charset,
      collate: config.defaults.collate,
      pool: {
        max: 5,
        min: 1,
        idle: 10000
      }
    });
} else {
  //production
  sequelize = new Sequelize(process.env[config.production.use_env_variable], {
    dialectOptions: {
      charset: config.defaults.charset,
      collate: config.defaults.collate
    },
    charset: config.defaults.charset,
    collate: config.defaults.collate,
    pool: config.production.pool
  });
}

module.exports = sequelize;

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
        charset: 'utf8mb4'
      },
      charset: config.defaults.charset,
      collate: config.defaults.collate,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    charset: config.defaults.charset,
    collate: config.defaults.collate,
    pool: {
      max: 1,
      min: 0,
      idle: 1000
    }
  });
}

module.exports = sequelize;

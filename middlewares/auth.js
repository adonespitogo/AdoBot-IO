var env = process.env.NODE_ENV || 'development'
var config = require('../config/config')
var creds = config[env].admin
var username = env === 'production' ? process.env[creds.username.use_env_variable] : creds.username
var password = env === 'production' ? process.env[creds.password.use_env_variable] : creds.password

module.exports = function(req, res, next) {
  var login_username = req.headers['username'] || req.body.username
  var login_password = req.headers['password'] || req.body.password
  if (login_username === username && login_password === password) {
    if (req.path === '/login') {
      res.status(200).send()
    } else {
      next()
    }
  } else {
    res.status(401).send()
  }

}

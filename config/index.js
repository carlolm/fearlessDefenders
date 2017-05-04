const env = process.env.NODE_ENV || 'development';

if (env === 'development'){
  config = require('./config.dev.js');
}

if(env === 'production'){
    config = require('./env/config.prod.js');
}

module.exports = config;

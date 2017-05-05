

const env = process.env.NODE_ENV || 'development';

let config;

if (env === 'development') {
  config = require('./config.dev.js'); // eslint-disable-line
}

if (env === 'production') {
  config = require('./config.prod.js'); // eslint-disable-line
}

module.exports = config;

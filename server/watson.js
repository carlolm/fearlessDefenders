const watson = require('watson-developer-cloud');
const keys = require('../config');

const toneAnalyzer = watson.tone_analyzer({
  username: keys.watson.username,
  password: keys.watson.password,
  version: 'v3',
  version_date: '2016-05-19 ',
});


module.exports = toneAnalyzer;

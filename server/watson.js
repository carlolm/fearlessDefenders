const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const keys = require('../config');

const nlu = new NaturalLanguageUnderstandingV1({
  username: keys.watson.username,
  password: keys.watson.password,
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27,
});


nlu.getSentiment = text => new Promise((resolve, reject) => {
  const options = {
    html: text, // Buffer or String
    features: {
      sentiment: {},
    },
    return_analyzed_text: true,
  };

  nlu.analyze(options, (err, response) => {
    if (err) { reject(err); }
    resolve(response);
  });
});

module.exports = nlu;

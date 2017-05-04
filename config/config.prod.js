// change name to config.js after adding api keys to make app work

module.exports = {
  watson: {
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
  },
  twitter: {
    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SECRET,
    access_token_key: process.env.TW_ACCESS_TOKEN,
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
  },
};

const Twitter = require('twitter');
const Keys = require('../../config').twitter;

const client = new Twitter({
  consumer_key: Keys.consumer_key,
  consumer_secret: Keys.consumer_secret,
  access_token_key: Keys.access_token_key,
  access_token_secret: Keys.access_token_secret,
});


/**
 *  Twitter stream
 */

// const streamTweets = (req, res) => {

//   const params = {
//     track: req.body.ticker,
//   };

//   const stream = client.stream('statuses/filter', params);
//   stream.on('data', (event) => {

//     const newEvent = {
//       timeStamp: event.timestanp_ms,
//       username: event.user.name,
//       text: event.text,
//     }


//   });

//   stream.on('error', (error) => {
//     console.warn(error);
//   });
// }


module.exports.twitterClient = client;

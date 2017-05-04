const Twitter = require('twitter');
const Keys = require('../server/config.js').twitter;

const client = new Twitter({
  consumer_key: Keys.consumer_key,
  consumer_secret: Keys.consumer_secret,
  access_token_key: Keys.access_token_key,
  access_token_secret: Keys.access_token_secret,
});

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

const showStream = false;

/**
 *  Twitter: general search
 */


if (!showStream) {
  const params = {
    q: '$AAPL',
    // screen_name: 'sirkortes',
    count: 100,
  };

  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      console.log(typeof (tweets));
      tweets.forEach((tweet) => {
        console.log('------- ', tweet.created_at);
        console.log('@', tweet.user.screen_name, '(', tweet.user.name, ')');
        console.log('=> ', tweet.text);
      });
      console.log('---- SIZE OF TWEETS: ', tweets.length);
    } else {
      console.log(error);
    }
  });
}


/**
 *  Twitter stream
 */


if (showStream) {
  const params = {
    track: '#trump',
  };

  const stream = client.stream('statuses/filter', params);
  stream.on('data', (event) => {
    console.log('-----', Date(event.timestamp_ms));
    if (event.place) console.log('==> PLACE: ', event.place.full_name);
    console.log(event && event.text);
  });

  stream.on('error', (error) => {
    console.warn(error);
  });
}


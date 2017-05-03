const Twitter = require('twitter-node-client').Twitter;

const error = function (err, response, body) {
  console.log(body);
  console.log('ERROR [%s]', err);
};
const success = function (data) {
  // console.log('Data [%s]', data);
  let tweets = JSON.parse(data);

  if (!Array.isArray(tweets) && tweets.statuses && Array.isArray(tweets.statuses)) {
    tweets = tweets.statuses;
  }

  if (Array.isArray(tweets)) {
    tweets.forEach((tweet) => {
      console.log('------- ', tweet.created_at);
      console.log('@', tweet.user.screen_name, '(', tweet.user.name, ')');
      console.log('=> ', tweet.text);
    });

    console.log('---- SIZE OF TWEETS: ', tweets.length);
  } else {
    console.log(typeof tweets, Object.keys(tweets.statuses), Array.isArray(tweets.statuses));
  }
};

const keys = {
  consumerKey: 'jBrT5Q9qLNxWhvbW0qvzjr8vx',
  consumerSecret: 'Uep32JVmIudT2wKZMVMlf8vDoQBw8BiB4RRDcZuqNkGIdmbZQu',
  accessToken: '259838174-HPTZh8gs8lA3fjznvWZq4JSId0nofTnFraqCNBDU',
  accessTokenSecret: 'JZgEpWBk8eTnMzMt4RuwB3AJSFFI7566rcIuuWXyyZALJ',
};

const twitter = new Twitter(keys);

// const params = {
//   screen_name: 'realDonaldTrump',
//   count: '10',
// };

// twitter.getUserTimeline(params, error, success);

// twitter.getMentionsTimeline({ count: '10' }, error, success);

// twitter.getHomeTimeline({ count: '10' }, error, success);

// twitter.getReTweetsOfMe({ count: '10' }, error, success);

//
// Get 10 tweets containing the hashtag haiku
//

// search?l=&q=hack%20reactor%20since%3A2017-03-26%20until%3A2017-03-27&src=typd

const params = {
  q: 'hack reactor since:2017-03-26 until:2017-03-27',
  count: 100,
};

twitter.getSearch(params, error, success);

//
// Get 10 popular tweets with a positive attitude about a movie that is not scary.
//

// twitter.getSearch({ 'q': ' movie -scary :)ls
// since:2013-12-27', 'count': 10, 'result\_type': 'popular' }, error, success);

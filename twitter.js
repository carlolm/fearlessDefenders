var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',

});
 
var params = {screen_name: 'calebcordry'
};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    // console.log(typeof(tweets));
    tweets.forEach(x => {
      console.log(x);
    })
  } else {
    console.log(error);
  }
});

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const toneAnalyzer = require('./watson');
const TwitterSearch = require('./api/twitter-search.js');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.get('/api/watson', (req, res) => {
  const input = {
    utterances: [
      { text: 'Basically think of $AAPL as a ~$32B SaaS business linked to a ~$200B hardware business with gross margins of ~38 percent ' },
      { text: 'When @tim_cook was here one year ago today, $AAPL was at $93. "Hold it, don\'t trade it." -@JimCramer' },
      { text: 'Hilarious that @jimcramer mentioned the @amazonfirephone in his interview with @tim_cook. #CNBC #MadMoney $AAPL' },
    ],
  };

  toneAnalyzer.tone_chat(input, (err, tone) => {
    if (err) { return console.warn(err); }
    return res.send(tone);
  });
});

app.post('/api/tweets', TwitterSearch.getTweets);
/**
 * Get an object with tweet data for use in sending to watson
 * @function
 * @param {string} req.body.query - Query string (e.g. '$AAPL' for apple stock ticker)
 * @param {string} req.body.endDate [optional] - latest date of tweets to retrieve 'yyyy-mm-dd'
 *                                  Default value: current date + 1
 * @param {string} req.body.startDate [optional] - earliest date of tweets to retrieve 'yyyy-mm-dd'
 *                                    Default value: endDate minus 1 day
 * @param {string} req.body.maxTweets [optional] - max number of tweets to retrieve
 *                                    Default value: 1000
 *
 * @return {object}   {
 *                      first: [date/time of least recent tweet],
 *                      last: [date/time of most recent tweet],
 *                      tweetCount: [number of tweets received],
 *                      tweet: [string object of aggregated tweets returned],
 *                    }
 */


app.get('/:bad*', (req, res) => {
  res.status(404).send(`Resource not found '${req.params.bad}'`);
});

app.listen(process.env.PORT || 3000, () => {
  console.warn('Backend server listening on port 3000!');
});

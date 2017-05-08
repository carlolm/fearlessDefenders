const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const TwitterSearch = require('./api/twitter-search.js');
const TwitterStream = require('./api/twitter-stream.js').twitterClient;

const socket = require('socket.io');

const naturalLanguage = require('./watson');

const app = express();

/**
 *  EXPRESS CONFIG
 */

app.use(express.static(path.join(__dirname, '../build')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const cors = require('cors');
// app.use(cors());

app.post('/api/watson', (req, res) => {
  const { text } = req.body;
  naturalLanguage.getSentiment(text)
    .then(response => res.send(response))
    .catch(err => res.send(err));
});

/**
 *    SOCKET IO CONFIG
 */

const http = require('http');

const server = http.Server(app);
const io = socket.listen(server);

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
// io.configure(function () {  
// io.set("transports", ["xhr-polling"]); 
// io.set("polling duration", 10); 
// });

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


// need to define single instance of streaming
let stream;

app.post('/api/stream', (req, res) => {
  console.log('[server] api/stream - STREAMING REQUEST', req.body.ticker);
  if (stream) stream.destroy();

  const showStream = req.body.showStream || false;

  const params = {
    track: req.body.ticker,
  };
  stream = TwitterStream.stream('statuses/filter', params);

  if (req.body.ticker !== '' && showStream) {
    stream.on('data', (event) => {
      const newEvent = {
        timeStamp: event.created_at,
        username: event.user.screen_name,
        text: event.text,
      };

      io.emit('tweet', newEvent);
      console.log(newEvent);
    });

    stream.on('error', (error) => {
      stream.destroy();
      console.log('*** STREAM DESTROYED ***');
      console.warn(error);
    });

    res.send({ message: 'Streaming started' });
  } else {
    stream.destroy();
    res.send({ message: 'Streaming stopped' });
  }
});

app.get('/:bad*', (req, res) => {
  res.status(404).send(`Resource not found '${req.params.bad}'`);
});

server.listen(process.env.PORT || 3000, () => {
  console.warn('Backend server listening on port 3000!');
});

// socketApp.listen(5000, () => {
//   console.warn('Socket IO server listening on port 5000!');
// });

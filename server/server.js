const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const Scores = require('./db');
const naturalLanguage = require('./watson');
const TwitterSearch = require('./api/twitter-search.js');
const TwitterStream = require('./api/twitter-stream.js').twitterClient;

const socket = require('socket.io')({
  transports: ['xhr-polling'],
  'polling duration': 10,
});

const app = express();

/*
 *  EXPRESS CONFIG
 */

app.use(express.static(path.join(__dirname, '../build')));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// const cors = require('cors');
// app.use(cors());

app.get('/api/quandl/:ticker', (req, res) => {
  request('https://www.quandl.com/api/v3/datasets/WIKI/' + req.params.ticker + '.json?start_date=2017-04-01&api_key=gxKmSwX855L3gFQvaiNL', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.end(response.body);
    } else {
      res.end(error, body);
    }
  });
});

app.post('/api/watson', (req, res) => {
  const { text } = req.body;
  naturalLanguage.getSentiment(text)
    .then(response => res.send(response))
    .catch(err => res.status(400).send(err));
});

app.get('/api/db', (req, res) => {
  const { date, symbol } = req.query;
  if (date) {
    Scores.findOne({ date, symbol })
      .then((scores) => {
        const result = scores || [];
        res.send(result);
      });
  } else {
    Scores.find({ symbol })
      .then(scores => res.send(scores));
  }
});

app.get('/api/db/allCompanies', (req, res) => {
  Scores.find({})
    .then(allScores => {
      let scores = allScores.map(x => {
        return { date: new Date(x.date), symbol: x.symbol, score: x.score };
      });
      scores = scores.sort((a, b) => b.date - a.date);
      const companies = {};
      let results = [];
      scores.forEach(x => {
        if (!companies.hasOwnProperty(x.symbol)) {
          companies[x.symbol] = x.symbol;
          results.push([x.symbol, x.date, x.score]);
        }
      });
      results = results.sort((a, b) => b[2] - a[2]);
      res.send(JSON.stringify(results));
    })
    .catch((err) => res.send({error: `[api/db/all] error retrieving: ${err}`}));
});

app.post('/api/db', (req, res) => {
  const { date, score, symbol } = req.body;
  const newScore = new Scores({ date, score, symbol });

  newScore.save().then((saved) => {
    console.log({ saved });
    res.send(saved);
  });
});

/*
 *    SOCKET IO CONFIG
 */

const http = require('http');

const server = http.Server(app);
const io = socket.listen(server);

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku

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
 *                      symbol: query of search (ticker)
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

app.get('/api/quandl/:ticker', (req, res) => {
  request(`https://www.quandl.com/api/v3/datasets/WIKI/${req.params.ticker}.json?start_date=2017-01-01?api_key=gxKmSwX855L3gFQvaiNL`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.end(response.body);
    } else {
      console.log(error);
    }
  });
});

app.post('/company/search', (req, res) => {
  console.log('[server] /company/search: ', req.body);
  request(`http://d.yimg.com/aq/autoc?query=${req.body.company}&region=US&lang=en-US`, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const newBody = JSON.parse(body);

      const result = {
        ticker: newBody.ResultSet.Query,
        securities: [],
      };

      newBody.ResultSet.Result.forEach((object) => {
        if (object.typeDisp === 'Equity') {
          const newObj = {
            symbol: object.symbol,
            name: object.name,
            exchange: object.exchDisp,
          };
          result.securities.push(newObj);
        }
      });

      res.send(JSON.stringify(result));
    } else {
      res.send({ error: err });
    }
  });
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

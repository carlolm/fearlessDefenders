const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const toneAnalyzer = require('../watson');

const app = express();

// Cors dealt with outside server.js although kept commented if needed
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
};

app.use(express.static(path.join(__dirname, '../build')));

app.use((req, res, next) => {
  res.header(headers);
  next();
});

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.post('/', (req, res) => {
  res.writeHead(201, headers);
  res.end('Hello World');
});

// To add when deployed
// app.get('/cookie', function(req, res) {
//   res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
// });

app.get('/', (req, res) => {
  res.status(200).sendFile('./index.html');
});

/*watson requests*/

app.get('/v3/tone', (req, res) => {

});

app.post('/v3/tone', (req, res) => {
  toneAnalyzer.tone({ text: 'A word is dead when it is said, some say. Emily Dickinson' },
    function(err, tone) {
      if (err)
        console.log(err);
      else
        res.json(tone, null, 2);
  });
});

app.get('*', (req, res) => {
  res.writeHead(404, headers);
  res.end('Resource not found');
});

app.listen(process.env.PORT || 3000);
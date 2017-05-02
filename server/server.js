const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Cors dealt with outside server.js although kept commented if needed
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE',
};

app.use(express.static(__dirname.join('/../src')));

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
  res.writeHead(200, headers);
  res.end('Hello Get World');
});

app.listen(3000);


var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE"
};

app.use(function(req, res, next) {
  res.header(headers);
  next();
});

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());

app.post('/', function(req, res) {
  res.writeHead(201, headers);
  res.end('Hello World');
});

app.get('/cookie', function(req, res) {
  res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
})

app.listen(3000);
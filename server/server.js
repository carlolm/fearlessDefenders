var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// Cors dealt with outside server.js although kept commented if needed
var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE"
};

app.use(express.static(__dirname + '/../src'));

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

// To add when deployed
	// app.get('/cookie', function(req, res) {
	//   res.cookie(cookie_name , 'cookie_value').send('Cookie is set');
	// });

app.get('/', function(req, res) {
  res.writeHead(200, headers);
  res.end('Hello Get World');
});

app.listen(3000);
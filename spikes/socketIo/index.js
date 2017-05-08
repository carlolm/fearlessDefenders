var http = require('http'),
  fs = require('fs'),
  // NEVER use a Sync function except at start-up!
  index = fs.readFileSync(__dirname + '/index.html');

// ----------------------------
const Twitter = require('twitter');
const Keys = require('./config.js').twitter;

const client = new Twitter({
  consumer_key: Keys.consumer_key,
  consumer_secret: Keys.consumer_secret,
  access_token_key: Keys.access_token_key,
  access_token_secret: Keys.access_token_secret,
});

// ----------------------------


// Send index.html to all requests
const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);
});

// Socket.io server listens to our app
const io = require('socket.io').listen(app);

// Send current time to all connected clients
// function sendTime () {
//   io.emit('time', { time: new Date().toJSON() });
// }

// ----------------------------

const params = {
  track: '#sanfrancisco',
};

const stream = client.stream('statuses/filter', params);
stream.on('data', (event) => {
  console.log('-----', Date(event.timestamp_ms));
  if (event.place) console.log('==> PLACE: ', event.place.full_name);
  console.log(event && event.text);
  io.emit('tweet', { created_at: event.created_at, text: event.text });
});

stream.on('error', (error) => {
  console.warn(error);
});

// ----------------------------

// Send current time every 10 secs
// setInterval(sendTime, 2000);

// Emit welcome message on connection
io.on('connection', (socket) => {
  // Use socket to communicate with this particular client only, sending it it's own id
  socket.emit('welcome', { message: 'Welcome!', id: socket.id });

  socket.on('i am client', console.log);
});

app.listen(3000);

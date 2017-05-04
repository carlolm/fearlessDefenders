const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const toneAnalyzer = require('./watson');

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

app.get('/:bad*', (req, res) => {
  res.status(404).send(`Resource not found '${req.params.bad}'`);
});

app.listen(process.env.PORT || 3000, () => {
  console.warn('Backend server listening on port 3000!');
});

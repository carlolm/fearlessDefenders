
const toneAnalyzer = require('../spikes/watson');
const fakeData = require('../fakeData/watsonMockData');

app.post('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone', (req, res) => {
  toneAnalyzer.tone(fakeData.oneUser,
    function(err, tone) {
      if (err)
        console.log(err);
      else
        res.send(tone, null, 2);
  });
});

app.get('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone', (req, res) => {
  console.log(req.body);
})
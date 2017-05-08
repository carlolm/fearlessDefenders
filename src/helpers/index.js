export const formatDate = date => date.toISOString().slice(0, 10);

export const getDates = (numberOfDays) => {
  const today = new Date();
  const result = [];

  for (let i = 0; i < numberOfDays; i += 1) {
    const date = new Date(today - i);
    const formatted = formatDate(date);
    result.push(formatted);
  }
  return result;
};

export const saveToDatabase = (tweetBlob, sentiment) => {
  const { symbol } = tweetBlob;
  const score = sentiment.document.score;
  const date = formatDate(tweetBlob.first);

  const body = { symbol, date, score };

  const options = { method: 'POST', body: JSON.stringify(body) };
  return fetch('/api/db', options)
    .then(res => res.json());
};

export const fetchFromTwitter = (date, symbol) => {
  const body = { query: symbol, startDate: date, endDate: date };
  const options = { method: 'POST', body: JSON.stringify(body) };
  return fetch('/api/tweets', options)
    .then(res => res.json());
};

export const fetchFromWatson = (tweetBlob) => {
  const options = { method: 'POST', body: tweetBlob };
  const watson = fetch('/api/watson', options)
    .then(res => res.json())
    .catch(err => console.warn(err));

  const db = watson.then(score => saveToDatabase(tweetBlob, score));

  return Promise.all([watson, db])
    .then(([score, dbResolution]) => dbResolution); // eslint-disable-line
};

export const getSentiment = (date, symbol) => {
  const url = `/api/db?symbol=${symbol}`;
  return fetch(url)
  .then(res => res.json())
  .then((res) => {
    if (res.length) { throw res; }
    return fetchFromTwitter(date, symbol);
  })
  .then(tweetBlob => fetchFromWatson(tweetBlob))
  .catch((dbValue) => {
    console.log('found in db');
    return dbValue;
  });
};

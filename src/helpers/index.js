export const getDates = (numberOfDays) => {
  const today = new Date();
  const result = [];

  for (let i = 0; i < numberOfDays; i += 1) {
    const date = new Date(today - i);
    const formatted = date.toISOString().slice(0, 10);
    result.push(formatted);
  }
  return result;
};

export const fetchFromTwitter = (date, symbol) => {
  const body = { query: symbol, startDate: date, endDate: date };
  const options = { method: 'POST', body: JSON.stringify(body) };
  fetch('/api/tweets', options)
    .then(res => {
      debugger;
    })
}

export const fetchFromWatson = () => {

}

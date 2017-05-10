import React from 'react';

import Search from './Search';
import Sidebar from './Sidebar';
import Main from './Main';
import Tweets from './Tweets';

import { getDates, getSentiment, getCompanySummary } from '../helpers';

import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ticker: 'AAPL',
      companiesSummary: [],
    };

    this.fetchData = this.fetchData.bind(this);
    this.changeTicker = this.changeTicker.bind(this);
    this.fetchCompaniesSummary = this.fetchCompaniesSummary.bind(this);
  }

  fetchData(symbol) {
    const numberOfDays = 5;
    const dates = getDates(numberOfDays);
    debugger;

    Promise.all(dates.map(date => getSentiment(date, symbol)))
      .then(data => this.setState({ data }))
      .then(() => {
        this.fetchCompaniesSummary();
        console.log('SUCCESS!!');
      });
  }

  fetchCompaniesSummary() {

    Promise.resolve(getCompanySummary())
      .then((companiesSummary) => {
        (companiesSummary.length > 0) ? this.setState({ companiesSummary }) : null;
      })
    .catch(err => console.warn({error: `fetchCompaniesSummary error: ${err}`}));

  }

  changeTicker(ticker) {
    this.setState({ ticker });
  }

  componentWillMount() {
    this.fetchCompaniesSummary();
  }

  render() {
    return (
      <div className="site-wrap">
        <div className="header">
          <h1>Hack Trader</h1>
        </div>
        <div className="nav">
          <Search fetchData={this.fetchData} changeTicker={this.changeTicker} />
        </div>
        <div className="content">
          <Sidebar />
          <Main ticker={this.state.ticker} />
          <Tweets companiesSummary={this.state.companiesSummary} />
        </div>
      </div>
    );
  }

}

export default App;

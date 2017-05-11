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
      data: [],
      ticker: 'none',
      companiesSummary: [],
    };

    this.fetchData = this.fetchData.bind(this);
    this.changeTicker = this.changeTicker.bind(this);
    // this.fetchCompaniesSummary = this.fetchCompaniesSummary.bind(this);
  }

  fetchData(symbol) {
    const numberOfDays = 5;
    const dates = getDates(numberOfDays);

    const all = Promise.all(dates.map(date => getSentiment(date, symbol)));
    const companies = getCompanySummary();

    Promise.all([all, companies])
      .then(([data, companiesSummary]) => this.setState({ companiesSummary, data, ticker: symbol }))
      .then(() => {
        // this.fetchCompaniesSummary();
        console.log('SUCCESS!!');
      });
  }

  // fetchCompaniesSummary() {

  //   Promise.resolve(getCompanySummary())
  //     .then((companiesSummary) => {
  //       (companiesSummary.length > 0) ? this.setState({ companiesSummary }) : null;
  //     })
  //     // .then(() => this.setState({ ticker: symbol }))
  //   .catch(err => console.warn({error: `fetchCompaniesSummary error: ${err}`}));

  // }

  changeTicker(ticker) {
    // this.setState({ ticker });
  }

  componentWillMount() {
    // this.fetchCompaniesSummary();  // Initialize with a value
  }

  componentDidMount() {
    this.fetchData(this.state.ticker);
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
          <Main ticker={this.state.ticker} data={this.state.data} />
          <Tweets companiesSummary={this.state.companiesSummary} />
        </div>
      </div>
    );
  }

}

export default App;

import React from 'react';

import Search from './Search';
import Sidebar from './Sidebar';
import Main from './Main';
import Tweets from './Tweets';

import { getDates, getSentiment } from '../helpers';

import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ticker: 'AAPL',
    };

    this.fetchData = this.fetchData.bind(this);
    this.changeTicker = this.changeTicker.bind(this);
  }

  fetchData(symbol) {
    const dates = getDates(2);
    Promise.all(dates.map(date => getSentiment(date, symbol)))
      .then(res => { debugger; });
  }

  changeTicker(ticker) {
    this.setState({ ticker });
  }

  render() {
    // debugger;
    return (
      <div className="site-wrap">
        <div className="header">
          <h1>Hack Trader</h1>
        </div>
        <div className="nav">
          <Search fetchData={this.fetchData} changeTicker={this.changeTicker}/>
        </div>
        <div className="content">
          <Sidebar />
          <Main ticker={this.state.ticker} />
          <Tweets />
        </div>
      </div>
    );
  }

}

App.propTypes = {
  // : React.PropTypes.
};

export default App;

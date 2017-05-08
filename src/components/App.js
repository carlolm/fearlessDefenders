import React from 'react';

import Search from './Search';
import Sidebar from './Sidebar';
import Main from './Main';
import Tweets from './Tweets';
import stockChart from './chart.js'

import { getDates, fetchFromTwitter } from '../helpers';

import './css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(symbol) {
    debugger;
    const dates = getDates(5);
    Promise.all(dates.map(date => fetchFromTwitter(date, symbol)))
      // .then(result => {
      //   // do something
      //   debugger;
      // })
      // .then(result => fetchFromWatson)
  }

  render() {
    // debugger;
    return (
      <div className="site-wrap">
        <div className="header">
          <h1>Hack Trader</h1>
        </div>
        <div className="nav">
          <Search fetchData={this.fetchData} />
        </div>
        <div className="content">
          <Sidebar />
          <Main />
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

import React from 'react';

import Search from './Search';
import Sidebar from './Sidebar';
import Main from './Main';
import Tweets from './Tweets';

import './css/App.css';

const App = () => (
  <div className="site-wrap">
    <div className="header">
      <h1>Hack Trader</h1>
    </div>
    <div className="nav">
      <Search />
    </div>
    <div className="content">
      <Sidebar />
      <Main />
      <Tweets />
    </div>
  </div>
);

App.propTypes = {
  // : React.PropTypes.
};

export default App;

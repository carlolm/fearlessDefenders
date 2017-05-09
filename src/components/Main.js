import React from 'react';

import StockChart from './StockChart';

import './css/Main.css';

const Main = ({ data, ticker }) => (
  <div className="main">
    <h2>Main</h2>
    <StockChart ticker={ticker} />
  </div>
);

Main.propTypes = {
  data: React.PropTypes.object,
};

Main.defaultProps = {
  data: { text: 'coming soon' },
};

export default Main;

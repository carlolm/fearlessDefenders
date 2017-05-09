import React from 'react';

import Chart from './Chart.js';

import './css/Main.css';

const Main = ({ data, ticker }) => (
  <div className="main">
    <h2>Main</h2>
    <Chart ticker={ticker} />
  </div>
);

Main.propTypes = {
  data: React.PropTypes.object,
};

Main.defaultProps = {
  data: { text: 'coming soon' },
};

export default Main;

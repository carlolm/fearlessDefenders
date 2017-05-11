import React from 'react';

import StockChart from './StockChart';

import './css/Main.css';

const Main = ({ ticker, data }) => (
  <div className="main">
    <h2>Main</h2>
    <StockChart ticker={ticker} data = {data}/>
  </div>
);

export default Main;

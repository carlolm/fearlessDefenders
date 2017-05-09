import React from 'react';
import './css/TickerSearchEntry.css';

const TickerSearchEntry = ({ symbol, name, exchange }) => (
  <table className="search-result">
    <tbody>
      <tr>
        <td className="symbol">{symbol}</td>
        <td className="exchange">{exchange}</td>
      </tr>
      <tr>
        <td colSpan="2" className="name">{name}</td>
      </tr>
    </tbody>
  </table>
);

export default TickerSearchEntry;

import React from 'react';

import './css/Sidebar.css';

const Sidebar = ({}) => (
  <div className="sidebar">
    <h2>Favorites</h2>
    <ul>
      <li>AAPL</li>
      <li>GOOG</li>
      <li>FB</li>
      <li>TSLA</li>
      <li>GS</li>
    </ul>
  </div>
);

Sidebar.propTypes = {
  // : React.PropTypes.
};

export default Sidebar;

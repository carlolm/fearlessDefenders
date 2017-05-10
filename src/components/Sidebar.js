import React, { Component } from 'react';
import Chart from 'chart.js';

import './css/Sidebar.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <h2>Recent Searches</h2>
      </div>
    );
  }

}

Sidebar.propTypes = {
  // : React.PropTypes.
};

export default Sidebar;

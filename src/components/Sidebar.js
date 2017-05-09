import React, { Component } from 'react';
import Chart from 'chart.js';

import './css/Sidebar.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);

  }


  componentDidMount() {
    const ctx = document.getElementById('bar-chart');
    const barChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: ['Stock 1', 'Stock 2', 'Stock 3', 'Stock 4', 'Stock 5'],
        datasets: [{
          label: 'Watson Score',
          data: [100, 97, 88, 72, 65],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: 60 // Edit the value according to what you need
            }
          }],
          yAxes: [{
            stacked: true
          }]
        },
      },
    });
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

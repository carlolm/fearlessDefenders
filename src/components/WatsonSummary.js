import React, { Component } from 'react';
import Chart from 'chart.js';

import './css/WatsonSummary.css';


class WatsonSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watsonData: [
        ['stock1', 99],
        ['stock2', 80],
        ['stock3', 75],
        ['stock4', 50],
        ['stock5', -50],
      ],
    };
    this.generateChart = this.generateChart.bind(this);
  }

  generateChart() {
    let watsonData = [];

    for (let i = 0; i < 5; i++) {
      watsonData.push([`stock${i}`, (Math.random() * 2) - 1]);
    }

    watsonData = watsonData.sort((a, b) => b[1] - a[1]);

    this.setState({ watsonData });

    const labels = watsonData.map(tuple => tuple[0]);
    const data = watsonData.map(tuple => tuple[1] * 100);
    // const min = Math.max(-100, Math.min.apply(null, data) - 10);
    const min = -100;

    console.log('GENERATE CHART: ', labels, data, min);

    const ctx = document.getElementById('bar-chart');
    const barChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Watson Score',
          data: data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: -100, // Edit the value according to what you need
              max: 100,
            }
          }],
          yAxes: [{
            stacked: true
          }]
        },
      },
    });
  }

  componentDidMount() {

    console.log('*** WATSON SUMMARY DID MOUNT ***');
    this.generateChart();

  }

  render() {
    return (
      <div className="watson-bg">
        <canvas width="50px" height="75px" id="bar-chart" />
        <div id="bar-chart"></div>
      </div>
    );
  }

}

WatsonSummary.propTypes = {
  // : React.PropTypes.
};

export default WatsonSummary;

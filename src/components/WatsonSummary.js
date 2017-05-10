import React, { Component } from 'react';
import Chart from 'chart.js';

import './css/WatsonSummary.css';


class WatsonSummary extends Component {
  constructor(props) {
    super(props);
    this.generateChart = this.generateChart.bind(this);
  }

  generateChart() {

    const labels = this.props.companiesSummary.map(tuple => tuple[0]);
    const data = this.props.companiesSummary.map(tuple => tuple[2] * 100);

    let axisMax = Math.max(Math.max.apply(null, data), -Math.min.apply(null, data));
    axisMax = Math.min(100, Math.ceil(axisMax / 100 * 4) * 25);

    const colors = data.map((score) => {
      if (score >= 0) {
        return `rgba(75, 192, 192, ${Math.max(score/axisMax, 0.25)})`
      } else {
        return `rgba(255, 99, 132, ${Math.max(-score/axisMax, 0.25)})`
      }
    });

    const ctx = document.getElementById('watson-chart');
    const barChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Watson Score',
          data: data,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: -axisMax, // Edit the value according to what you need
              max: axisMax,
            },
          }],
          yAxes: [{
            stacked: true,
          }],
        },
      },
    });
  }

  componentDidMount() {
    this.generateChart();
  }

  componentDidUpdate() {
    this.generateChart();
  }

  render() {
    return (
      <div className="watson-bg">
        <canvas width="50px" onLoad={this.generateChart} height="75px" id="watson-chart" />
      </div>
    );
  }


}

WatsonSummary.propTypes = {
  // : React.PropTypes.
};

export default WatsonSummary;

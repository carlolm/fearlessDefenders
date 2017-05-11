import React, { Component } from 'react';
import Chart from 'chart.js';

import './css/WatsonSummary.css';

let ctx;
let barChart;

class WatsonSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watsonChart: 'watsonChart',
    };
    this.generateChart = this.generateChart.bind(this);
  }

  generateChart() {

    console.log('*** companiesSummary length: ', this.props.companiesSummary.length || 'companiesSummary is empty');

    if (this.props.companiesSummary.length !== 0) {

      const labels = this.props.companiesSummary.map(tuple => tuple[0]);
      const data = this.props.companiesSummary.map(tuple => tuple[2] * 100);

      let axisMax = Math.max(Math.max.apply(null, data), -Math.min.apply(null, data));
      axisMax = Math.min(100, Math.ceil(axisMax / 100 * 4) * 25);

      const colors = data.map((score) => {
        if (score >= 0) {
          return `rgba(75, 192, 192, ${Math.max(score / axisMax, 0.25)})`;
        } else {
          return `rgba(255, 99, 132, ${Math.max(-score / axisMax, 0.25)})`
        }
      });

      ctx = document.getElementById('watson-chart');

      if (barChart !== undefined) barChart.destroy();

      barChart = new Chart(ctx, {
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
        <canvas width="50px" onLoad={this.generateChart} height="100px" id="watson-chart" />
      </div>
    );
  }


}

WatsonSummary.propTypes = {
  // : React.PropTypes.
};

export default WatsonSummary;

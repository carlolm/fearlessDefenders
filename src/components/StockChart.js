import React, { Component } from 'react';
import ChartJS from 'chart.js';
import $ from 'jquery';
import './css/StockChart.css';

class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: 'AAPL',
    };

    this.createChart = this.createChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  updateChart() {
    this.createChart(this.props.ticker);
    this.setState({ ticker: this.props.ticker });
  }   

  createChart(ticker) {
    $.ajax({
      type: 'GET',
      url: `/api/quandl/${ticker}`,
      success: (result) => {
        console.log(typeof (result));
        console.log(result);
        result = JSON.parse(result);
        const labels = [];
        const data = [];
        for (let i = 0; i < 5; i++) {
          labels.unshift(result.dataset.data[i][0]);
          data.unshift(result.dataset.data[i][4]);
        }
        const ctx = document.getElementById('myChart');
        const myChart = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'stock value',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false,
                },
              }],
            },
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  componentDidMount() {
    this.createChart(this.state.ticker);
  }

  render() {
    return (
      <div className="chart-container">
        <h2>{this.state.ticker} Stock Price</h2>
        <canvas className="center" width="200" height="200" id="myChart" />
        <p className="center">
          <button className="button" onClick={this.updateChart}>Update chart</button>
        </p>
      </div>
    );
  }
}

export default StockChart;

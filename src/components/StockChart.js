import React, { Component } from 'react';
import ChartJS from 'chart.js';
import $ from 'jquery';
import './css/StockChart.css';

class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: 'none',
      myChart: 'a',
    };

    this.createChart = this.createChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateChart() {
    this.createChart(this.props.ticker);
  }   

  handleClick() {
    this.updateChart();
  }   

  createChart() {
    const ticker = this.props.ticker;
    
    console.log('** STOCK CHART - createChart: ', ticker);
    
    $.ajax({
      type: 'GET',
      url: `/api/quandl/${ticker}`,
      success: (result) => {
        result = JSON.parse(result);
        const labels = [];
        const quandlData = [];
        for (let i = 0; i < 5; i++) {
          labels.unshift(result.dataset.data[i][0]);
          quandlData.unshift(result.dataset.data[i][4]);
        }
        const ctx = document.getElementById('stock-chart');

        /***********************/
        // destroy current chart
        /***********************/

        if (this.state.myChart !== 'a') {
          console.log('called');
          this.state.myChart.destroy();
        }

        // get new data
        this.setState({myChart: new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                type: 'bar',
                label: 'Watson Score',
                data: [20, -20, -10, 50, 60],
                backgroundColor: [
                  'rgba(0, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(0, 0, 0, 1)',
                  'rgba(50, 50, 50, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
              {
              type: 'line',
              label: 'Stock Price',
              data: quandlData,
              // backgroundColor: [
              //   'rgba(255, 99, 132, 0.2)',
              //   'rgba(54, 162, 235, 0.2)',
              //   'rgba(255, 206, 86, 0.2)',
              //   'rgba(75, 192, 192, 0.2)',
              //   'rgba(153, 102, 255, 0.2)',
              //   'rgba(255, 159, 64, 0.2)',
              // ],
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
            // tooltips: {enabled: false},
            // hover: {mode: null},
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false,
                },
              }],
            },
          }
        })
        });
      },
      error: (error) => {
        console.log('ERROR CREATING CHART');
        console.warn('[StockChart.js error] ', error);
      },
    });
  }

  componentDidMount() {
    console.log('** StockChart DID MOUNT **');
    this.updateChart();
  }
 
  render() {
    return (
      <div className="chart-container">
        <h2>{this.props.ticker} Stock Price</h2>
        <canvas onLoad={this.createChart} className="center" height="300px" id="stock-chart" />
        <button onClick={this.handleClick}>Update Chart</button>
      </div>
    );
  }
}

export default StockChart;

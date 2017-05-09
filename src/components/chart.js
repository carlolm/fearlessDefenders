import React from 'react';
import Chart from 'chart.js';
import $ from 'jquery';

const get = () => {
  $.ajax({
    type: 'GET',
    url: '/api/quandl/AAPL',
    success: function(result) {
      console.log(typeof(result));
      console.log(result);
      result = JSON.parse(result);
      let labels = [];
      let data = [];
      for (let i = 0; i < 5; i++) {
        labels.unshift(result.dataset.data[i][0]);
        data.push(result.dataset.data[i][4]);
      }
      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
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
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    },
    error: function(error) {
      console.log(error);
    }
  });
}
const Chartes = () => (
  <div>
    <h1>Here is a chart</h1>
    <canvas onLoad={get()} width="200" height="200" id="myChart"></canvas> 
  </div>
)

export default Chartes

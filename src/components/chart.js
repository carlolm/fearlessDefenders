import React from 'react';

import '../Chart.js/Chart.js'

// will install chartjs serverside
// import '../Chart.js/Chart.js'

class stockChart extends React.Component {
  constructor(props) {
    super(props);
  }
  get() {

    /* Syntax for creating new chart
    let labels = [];
    let data = [];
    for (let i = 0; i < 5; i++) {
      labels.unshift(props[i].Date);
      data.push(props[i].Close);
    }

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
    */

  }
  render() {
    return (
      <canvas onload='get()' width="200" height="200"></canvas>
    )
  }
}

export default stockChart


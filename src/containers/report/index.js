import React, { useEffect } from 'react';
import './style.scss';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);


function index(props) {
  useEffect(()=>{showChart()},[])
  const showChart = () =>Highcharts.chart('container', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Doanh thu bán hàng năm 2020'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Doanh thu (triệu)'
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: 'Doanh thu: <b>{point.y:.1f} triệu</b>'
    },
    series: [{
      name: 'Revenue',
      data: [
        ['Tháng 1', 24.2],
        ['Tháng 2', 20.8],
        ['Tháng 3', 14.9],
        ['Tháng 4', 13.7],
        ['Tháng 5', 13.1],
        ['Tháng 6', 12.7],
        ['Tháng 7', 12.4],
        ['Tháng 8', 12.2],
        ['Tháng 9', 12.0],
        ['Tháng 10', 11.7],
        ['Tháng 11', null],
        ['Tháng 12', null],
        // ['Tháng 13', 11.1],
        // ['Jakarta', 10.6],
        // ['Dongguan', 10.6],
        // ['Lagos', 10.6],
        // ['Bengaluru', 10.3],
        // ['Seoul', 9.8],
        // ['Foshan', 9.3],
        // ['Tokyo', 9.3]
      ],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    }]
  });
  
  return <div className="report-page">
    <div id="container" className="chart-div"></div>
  </div>;
}

export default index;

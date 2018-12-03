import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'


const StockChart = ({ loading, data }) => {

  if (loading) return null;

  const normalizeInput = (value, firstValue) => {
    return value / firstValue * 100
  }

  const series = data.map((item, index) => {
    const entries = item.timeSeries.entries;
    const firstValue = entries[0].v
    return (
      {
        name: item.instrumentId,
        data: entries.map(item => ([new Date(item.d), normalizeInput(item.v, firstValue)]))
      })
  })


  const config = {
    rangeSelector: {
      inputEnabled: true
    },
    legend: {
      enabled: true,
      title: {
        style: { "fontWeight": "bold" },
        text: "Legend"
      }
    },
    tooltip: {
      enabled: false,
    },
    title: {
      text: 'Instruments Dataset'
    },
    yAxis: {
      labels: {
        formatter: function () {
          return this.value + "%";
        }
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        month: '%b %e, %Y'
      }
    },
    series: series,
    chart: {
      marginBottom: 100
    },
  };

  return (
    <HighchartsReact
      ref={(chart) => this.chart = chart}
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={config}
      callback={this.chartCallback}
    />
  );
}
}

export default StockChart;

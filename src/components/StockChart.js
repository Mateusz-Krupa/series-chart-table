import React, { PureComponent } from 'react';
import Highcharts from 'highcharts/highstock'
import PropTypes from 'prop-types';
import HighchartsReact from 'highcharts-react-official'

export default class StockChart extends PureComponent {

  render() {
    const { data, title, onGraphUpdate } = this.props;
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
        text: title,
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
      series: data,

      plotOptions: {
        series: {
          events: {
            legendItemClick: (e) => {
            }
          },
        }
      },

      chart: {
        marginBottom: 100,
        events: {
          render: (e) => {
            const series = e.target.series;
            const graphData = []
            series.forEach((item, index) => {
              if (index !== series.length - 1 && item.visible) {
                graphData.push({
                  name: item.name,
                  dates: item.processedXData,
                  values: item.processedYData
                })
              }
            })
            onGraphUpdate(graphData)
          }
        },
      }
    };

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={config}
      />
    );
  }
}

StockChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  onGraphUpdate: PropTypes.func.isRequired,
}

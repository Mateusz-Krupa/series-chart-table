import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getInstrumentsData } from './services/InstrumentService'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
    }
    getInstrumentsData().then(res =>
      this.setState({ data: res.mktData, loading: false })
    )
    this.chartCallback = this.chartCallback.bind(this)
  }

  chartCallback(arg) {
    console.log(arg)
  }

  render() {
    if (this.state.loading) return null;

    const normalizeInput = (value, firstValue) => {
      return value / firstValue * 100
    }

    const series = this.state.data.map((item, index) => {
      const entries = item.timeSeries.entries;
      const firstValue = entries[0].v
      return (
        {
          name: item.instrumentId,
          data: entries.map(item => ([new Date(item.d), normalizeInput(item.v, firstValue)]))
        })
    })


    const config = {
      rangeSelector : {
        inputEnabled:true
      },
      legend: {
        enabled: true,
        title:{
          style:{"fontWeight": "bold"},
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
      <div className="App">
        <HighchartsReact
          ref={(chart) => this.chart = chart}
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={config}
          callback={this.chartCallback}
        />
      </div>
    );
  }
}

export default App;

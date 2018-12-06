import React, { Component } from 'react';
import StockChart from './components/StockChart'
import { getInstrumentsData, mapGraphData } from './services/InstrumentsService'
import GraphTable from './components/GraphTable'
import './App.css'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      graphData: [],
      data: [],
      graph: {},
      loading: true,
    }
    getInstrumentsData().then(res =>
      this.setState({ data: mapGraphData(res.mktData), loading: false })
    )
    this.onGraphUpdate = this.onGraphUpdate.bind(this)
  }

  onGraphUpdate(graphData){
    if(graphData && graphData.length >= 0){
      this.setState({graphData})
    }
  }

  render() {
    const {graphData, data } = this.state;
    return (
        <div className="App">
          <div className="content">
          {!this.state.loading ?  
            <>
            <StockChart
              title="Instruments"
              data={data}
              onGraphUpdate={this.onGraphUpdate}
            />
            { graphData.length > 0 ? <GraphTable graphData={graphData}></GraphTable> : 
              <p className="no-data"> No Data </p> 
            }
            </> : <div className="loading">Loading...</div>}
          </div>
        </div>
    );
  }
}

export default App;

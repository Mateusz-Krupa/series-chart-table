import React, { Component } from 'react';
import StockChart from './components/StockChart'
import { getInstrumentsData, mapGraphData } from './services/InstrumentsService'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormLabel from '@material-ui/core/FormLabel'
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
      form: {
        min: '',
        max: ''
      },
      min: null,
      max: null,
    }
    getInstrumentsData().then(res => {
        this.setState({ data: mapGraphData(res.mktData), loading: false })
      }
    )
    this.onGraphUpdate = this.onGraphUpdate.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onGraphUpdate(graphData){
    if(graphData && graphData.length >= 0){
      this.setState({graphData})
    }
  }

  onSubmit(e){
    e.preventDefault()
    this.setState({ min: this.state.form.min, max: this.state.form.max });
  }

  onChangeInput(e){
    const stateCopy = {...this.state} 
    stateCopy.form[e.target.name] = e.target.value;
    this.setState(stateCopy);
  }

  render() {
    const {graphData, data, min, max} = this.state;
    return (
        <div className="App">
          <div className="content">
          {!this.state.loading ?  
            <>
            <StockChart
              title="Instruments"
              data={data}
              onGraphUpdate={this.onGraphUpdate}
              min={min}
              max={max}
            />
            <form className="form">
              <p> Please provide values for y-axis </p>
              <FormLabel> min: <Input type="number" value={this.state.form.min} name="min" onChange={this.onChangeInput} /> </FormLabel>
              <FormLabel> max: <Input type="number" value={this.state.form.max} name="max" onChange={this.onChangeInput} /> </FormLabel>
              <Button type="submit" variant="contained" color="primary" onClick={this.onSubmit}> Submit </Button>
            </form>
            { graphData.length > 0 ? <GraphTable graphData={graphData} min={min} max={max}></GraphTable> : 
              <p className="no-data"> No Data </p> 
            }
            </> : <div className="loading">Loading...</div>}
          </div>
        </div>
    );
  }
}

export default App;

const getInstrumentsData = async () => {
  return await fetch('/mktData.json' , {}).then(res => res.json())
}

const normalizeInput = (value, firstValue) => {
  return (value / firstValue * 100)
}

const mapGraphData = (data) =>  
  data.map((item, index) => {
    const entries = item.timeSeries.entries;
    const firstValue = entries[0].v
    return (
      {
        name: item.instrumentId,
        data: entries.map(item => ([new Date(item.d).getTime(), normalizeInput(item.v, firstValue)]))
    })

})

export { getInstrumentsData, mapGraphData, normalizeInput}
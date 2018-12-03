const getInstrumentsData = async () => {
  return await fetch('/mktData.json' , {}).then(res => res.json())
}

export { getInstrumentsData }
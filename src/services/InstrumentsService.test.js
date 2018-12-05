import { normalizeInput, mapGraphData } from './InstrumentsService';

it('should be 100 when the input and first value are the same', () => {
  const expected = normalizeInput(200, 200)
  expect(expected).toBe(100)
});


it('should be 50 when the input and first value in two times biger then provided', () => {
  const expected = normalizeInput(200, 400)
  expect(expected).toBe(50)
});


it('mapGraphData method should map the response to {name, values} object', () => {
  const mockedObject = [
    {
      instrumentId: 'Instrument Name',
      timeSeries: {
        entries: [ { d: "2010-01-01", v: 6545.91 }]
      }
    }
  ]
  const expected = [{"data": [[new Date("2010-01-01"), 100]], "name": "Instrument Name"}]
  expect(mapGraphData(mockedObject)).toEqual(expected)
})
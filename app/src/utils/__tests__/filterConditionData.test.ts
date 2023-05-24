import { filterConditionData } from '../filterConditionData'
import { testBAWeatherData } from '../../mockdata/data'

describe('filterConditionData test', () => {
  test('returns array of airConditionData with length 5', () => {
    const filteredData = filterConditionData(testBAWeatherData)
    expect(filteredData.length).toBe(5)
  })

  test('returns condition with tile Wind speed', () => {
    const filteredData = filterConditionData(testBAWeatherData)[0]
    expect(filteredData.condition).toBe('Wind speed')
  })

  test('returns variable of air condition ', () => {
    const filteredData = filterConditionData(testBAWeatherData)[0]
    expect(filteredData.variable).toBe('wind_kph')
  })

  test('returns value of wind speed', () => {
    const filteredData = filterConditionData(testBAWeatherData)[0]
    expect(filteredData.value).toBe(3.6)
  })

  test('returns unit of wind speed', () => {
    const filteredData = filterConditionData(testBAWeatherData)[0]
    expect(filteredData.unit).toBe('km/h')
  })

  test('returns object that have image icon representing condition', () => {
    const filteredData = filterConditionData(testBAWeatherData)[0]
    expect(Object.prototype.hasOwnProperty.call(filteredData, 'iconURL')).toBeTruthy()
  })

  test('returns condition with tile Wind direction', () => {
    const filteredData = filterConditionData(testBAWeatherData)[1]
    expect(filteredData.condition).toBe('Wind direction')
  })

  test('returns variable of air condition ', () => {
    const filteredData = filterConditionData(testBAWeatherData)[1]
    expect(filteredData.variable).toBe('wind_dir')
  })

  test('returns value of wind direction', () => {
    const filteredData = filterConditionData(testBAWeatherData)[1]
    expect(filteredData.value).toBe('WSW')
  })

  test('returns unit of wind direction (none)', () => {
    const filteredData = filterConditionData(testBAWeatherData)[1]
    expect(filteredData.unit).toBe('')
  })

  test('returns object that have image icon representing condition', () => {
    const filteredData = filterConditionData(testBAWeatherData)[1]
    expect(Object.prototype.hasOwnProperty.call(filteredData, 'iconURL')).toBeTruthy()
  })

  test('returns condition with tile Real feel', () => {
    const filteredData = filterConditionData(testBAWeatherData)[2]
    expect(filteredData.condition).toBe('Real feel')
  })

  test('returns variable of air condition ', () => {
    const filteredData = filterConditionData(testBAWeatherData)[2]
    expect(filteredData.variable).toBe('feelslike_c')
  })

  test('returns value of real feel temperature', () => {
    const filteredData = filterConditionData(testBAWeatherData)[2]
    expect(filteredData.value).toBe(13.2)
  })

  test('returns unit of real feel temperature', () => {
    const filteredData = filterConditionData(testBAWeatherData)[2]
    expect(filteredData.unit).toBe('°C')
  })

  test('returns object that have image icon representing condition', () => {
    const filteredData = filterConditionData(testBAWeatherData)[2]
    expect(Object.prototype.hasOwnProperty.call(filteredData, 'iconURL')).toBeTruthy()
  })

  test('returns condition with tile UV Index', () => {
    const filteredData = filterConditionData(testBAWeatherData)[3]
    expect(filteredData.condition).toBe('UV Index')
  })

  test('returns variable of air condition ', () => {
    const filteredData = filterConditionData(testBAWeatherData)[3]
    expect(filteredData.variable).toBe('uv')
  })

  test('returns value of UV Index', () => {
    const filteredData = filterConditionData(testBAWeatherData)[3]
    expect(filteredData.value).toBe(5)
  })

  test('returns unit of UV Index, (none)', () => {
    const filteredData = filterConditionData(testBAWeatherData)[3]
    expect(filteredData.unit).toBe('')
  })

  test('returns object that have image icon representing condition', () => {
    const filteredData = filterConditionData(testBAWeatherData)[3]
    expect(Object.prototype.hasOwnProperty.call(filteredData, 'iconURL')).toBeTruthy()
  })

  test('returns condition with tile Humidity', () => {
    const filteredData = filterConditionData(testBAWeatherData)[4]
    expect(filteredData.condition).toBe('Humidity')
  })

  test('returns variable of air condition ', () => {
    const filteredData = filterConditionData(testBAWeatherData)[4]
    expect(filteredData.variable).toBe('humidity')
  })
})

test('returns value of humidity', () => {
  const filteredData = filterConditionData(testBAWeatherData)[4]
  expect(filteredData.value).toBe(33)
})

test('returns unit of humidity', () => {
  const filteredData = filterConditionData(testBAWeatherData)[4]
  expect(filteredData.unit).toBe('%')
})

test('returns object that have image icon representing condition', () => {
  const filteredData = filterConditionData(testBAWeatherData)[4]
  expect(Object.prototype.hasOwnProperty.call(filteredData, 'iconURL')).toBeTruthy()
})

import { selectImage } from '../selectImage'
import { testWeatherCondition } from '../../mockdata/data'
import { ConditionImages } from '../../data/conditions'

const testConditionImagesURL: ConditionImages[] = [
  {
    condition: 'Partly cloudy',
    current: {
      day: 'url/current/day-partly-cloudy',
      night: 'url/current/night-partly-cloudy',
    },
    forecast: {
      day: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      night: '//cdn.weatherapi.com/weather/64x64/night/116.png',
    },
  },
]

describe('selectImage function test', () => {
  test('returns URL for img of current day weather - Partly cloudy', () => {
    expect(selectImage(testWeatherCondition, true, 'current', testConditionImagesURL)).toBe(
      'url/current/day-partly-cloudy',
    )
  })

  test('returns URL for img of current night weather - Partly cloudy', () => {
    expect(selectImage(testWeatherCondition, false, 'current', testConditionImagesURL)).toBe(
      'url/current/night-partly-cloudy',
    )
  })

  test('returns URL for img of forecast day weather - Partly cloudy', () => {
    expect(selectImage(testWeatherCondition, true, 'forecast', testConditionImagesURL)).toBe(
      '//cdn.weatherapi.com/weather/64x64/day/116.png',
    )
  })

  test('returns URL for img of forecast night weather - Partly cloudy', () => {
    expect(selectImage(testWeatherCondition, false, 'forecast', testConditionImagesURL)).toBe(
      '//cdn.weatherapi.com/weather/64x64/night/116.png',
    )
  })
})

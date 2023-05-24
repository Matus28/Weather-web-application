import { TodayForecast } from '../TodayForecast/TodayForecast'
import { render } from '@testing-library/react'
import { testBAWeatherData } from '../../mockdata/data'

describe('TodayForecast component test', () => {
  test('returns div element with forecast data', () => {
    const { container } = render(
      <TodayForecast forecastData={testBAWeatherData.forecast.forecastday[0]} />,
    )
    const mainDiv = container.getElementsByClassName('card-body today-forecast')[0]
    expect(mainDiv).toBeDefined()
  })

  test('returns list of elements for every 3 hours from 6am untill 21pm', () => {
    const { container } = render(
      <TodayForecast forecastData={testBAWeatherData.forecast.forecastday[0]} />,
    )
    const divTitle = container.getElementsByClassName('today-forecast__title')[0]
    const elementList = container.getElementsByClassName('today-forecast-element__time')
    // eslint-disable-next-line
    expect(divTitle.textContent).toBe("Today's forecast")
    expect(elementList.length).toBe(6)
  })
})

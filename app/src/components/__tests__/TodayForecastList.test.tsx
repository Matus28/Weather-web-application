import { TodayForecastList } from '../TodayForecast/TodayForecastList'
import { render } from '@testing-library/react'
import { testBAWeatherData } from '../../mockdata/data'

describe('TodayForecastList component test', () => {
  test('returns main div elemenet with forecast list of elements', () => {
    const { container } = render(
      <TodayForecastList
        forecastData={testBAWeatherData.forecast.forecastday[0]}
        start={0}
        end={9}
        step={3}
      />,
    )
    const mainDiv = container.getElementsByClassName('today-forecast-list')[0]
    expect(mainDiv).toBeDefined()
  })

  test('returns all 3 elements with forecast data', () => {
    const { container } = render(
      <TodayForecastList
        forecastData={testBAWeatherData.forecast.forecastday[0]}
        start={0}
        end={6}
        step={3}
      />,
    )
    const divElements = container.getElementsByClassName('today-forecast-list')[0].childNodes
    const elementList = container.getElementsByClassName('today-forecast-element__time')
    expect(divElements.length).toBe(3)
    expect(elementList[0].textContent).toBe('12:00 AM')
    expect(elementList[1].textContent).toBe('03:00 AM')
    expect(elementList[2].textContent).toBe('06:00 AM')
  })
})

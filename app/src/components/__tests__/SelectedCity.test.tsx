import { SelectedCity } from '../SelectedCity/SelectedCity'
import { render } from '@testing-library/react'
import { testBAWeatherData } from '../../mockdata/data'

testBAWeatherData.location.name = 'Bratislava'
// eslint-disable-next-line
testBAWeatherData.forecast.forecastday[0].day.daily_chance_of_rain = 0
// eslint-disable-next-line
testBAWeatherData.current.temp_c = 13
testBAWeatherData.current.condition.text = 'Sunny'

describe('SelectedCity page test', () => {
  test('renders div created by Card component', () => {
    const { container } = render(<SelectedCity data={testBAWeatherData} />)
    const divCard = container.getElementsByClassName('card-body selected-city')[0]
    expect(divCard).toBeDefined()
  })

  test('renders all main information about weather data of selected city (Bratislava)', () => {
    const { container } = render(<SelectedCity data={testBAWeatherData} />)
    const temperature = container.getElementsByClassName('selected-city-weather__temp')[0]
    const city = container.getElementsByClassName('selected-city-weather__city')[0]
    const rain = container.getElementsByClassName('selected-city-weather__rain')[0]
    const mainDiv = container.getElementsByClassName(
      'selected-city-weather__main',
    )[0] as HTMLDivElement
    const mainImage = mainDiv.getElementsByTagName('img')[0]
    expect(temperature.textContent).toBe('13°C')
    expect(city.textContent).toBe('Bratislava')
    expect(rain.textContent).toBe('Chance of rain: 0%')
    expect(mainImage).toBeDefined()
  })

  test('renders todays forecast information', () => {
    const { container } = render(<SelectedCity data={testBAWeatherData} />)
    const divTodayForecast = container.getElementsByClassName(
      'selected-city-weather__today-forecast',
    )[0]
    const divTitle = container.getElementsByClassName(
      'selected-city-weather__today-forecast__title',
    )[0]
    const divForecastList = container.getElementsByClassName('today-forecast-list')[0].childNodes
    expect(divTodayForecast).toBeDefined()
    // eslint-disable-next-line
    expect(divTitle.textContent).toBe("Today's forecast")
    expect(divForecastList.length).toBe(3)
  })

  test('renders three day forecast', () => {
    const { container } = render(<SelectedCity data={testBAWeatherData} />)
    const divThreeDayForecast = container.getElementsByClassName(
      'selected-city-weather__three-days-forecast',
    )[0]
    const divTitle = container.getElementsByClassName(
      'selected-city-weather__three-days-forecast__title',
    )[0]
    const divThreeDayForecastList =
      container.getElementsByClassName('week-forecast-list')[0].childNodes
    expect(divThreeDayForecast).toBeDefined()
    expect(divTitle.textContent).toBe('3 day forecast')
    expect(divThreeDayForecastList.length).toBe(3)
  })
})

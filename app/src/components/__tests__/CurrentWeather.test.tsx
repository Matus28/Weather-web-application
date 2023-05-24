import CurrentWeather from '../CurrentWeather/CurrentWeather'
import { fireEvent, render, screen } from '@testing-library/react'
import { testBAWeatherData } from '../../mockdata/data'

testBAWeatherData.location.name = 'Bratislava'
// eslint-disable-next-line
testBAWeatherData.forecast.forecastday[0].day.daily_chance_of_rain = 0
// eslint-disable-next-line
testBAWeatherData.current.temp_c = 13
testBAWeatherData.current.condition.text = 'Sunny'

const addCityHandler = jest.fn()
const checkHandler = jest.fn()

describe('CurrentWeather component test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders card with current weather data from Bratislava', () => {
    const { container } = render(
      <CurrentWeather
        weatherData={testBAWeatherData}
        isChecked={false}
        onAddCity={addCityHandler}
        onCheck={checkHandler}
      />,
    )
    const divCurrentWeather = container.getElementsByClassName('card-body')
    expect(divCurrentWeather).toBeDefined()
    expect(divCurrentWeather.length).toBe(1)
  })

  test('returns elements with all data about current weather in Bratislava', () => {
    const { container } = render(
      <CurrentWeather
        weatherData={testBAWeatherData}
        isChecked={false}
        onAddCity={addCityHandler}
        onCheck={checkHandler}
      />,
    )
    const CityName = container.getElementsByClassName('current-weather__city')[0].firstChild
    const divRain = container.getElementsByClassName('current-weather__rain')[0]
    const divTemp = container.getElementsByClassName('current-weather__temp')[0]
    const divCond = container.getElementsByClassName('current-weather__condition')[0]
    const image = screen.getByAltText('Symbol image of weather') as HTMLImageElement
    expect(CityName?.textContent).toBe('Bratislava')
    expect(divRain.textContent).toBe('Chance of rain: 0%')
    expect(divTemp.textContent).toBe('13°C')
    expect(divCond.textContent).toBe('Sunny')
    expect(image).toBeDefined()
  })

  test('returns input element type of checkbox as Switch', () => {
    const { container } = render(
      <CurrentWeather
        weatherData={testBAWeatherData}
        isChecked={false}
        onAddCity={addCityHandler}
        onCheck={checkHandler}
      />,
    )
    const inputSwitch = container.getElementsByTagName('input')[0] as HTMLInputElement
    expect(inputSwitch).toBeDefined()
    fireEvent.click(inputSwitch)
    expect(checkHandler).toHaveBeenCalledTimes(1)
  })

  test('returns input element type of checkbox as Switch and is checked', () => {
    const { container } = render(
      <CurrentWeather
        weatherData={testBAWeatherData}
        isChecked={true}
        onAddCity={addCityHandler}
        onCheck={checkHandler}
      />,
    )
    const inputSwitch = container.getElementsByTagName('input')[0] as HTMLInputElement
    expect(inputSwitch.checked).toBeTruthy()
  })

  test('returns button element to add city on the list', () => {
    const { container } = render(
      <CurrentWeather
        weatherData={testBAWeatherData}
        isChecked={false}
        onAddCity={addCityHandler}
        onCheck={checkHandler}
      />,
    )
    const buttonAdd = container.getElementsByTagName('button')[0] as HTMLButtonElement
    expect(buttonAdd).toBeDefined()
    fireEvent.click(buttonAdd)
    expect(addCityHandler).toHaveBeenCalledTimes(1)
  })
})

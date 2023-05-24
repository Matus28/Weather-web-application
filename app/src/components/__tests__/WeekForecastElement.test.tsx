import { WeekForecastElement } from '../WeekForecast/WeekForecastElement'
import { render, screen } from '@testing-library/react'
import { testBAWeatherData } from '../../mockdata/data'

testBAWeatherData.forecast.forecastday[0].day.condition.text = 'Sunny'
// eslint-disable-next-line
testBAWeatherData.forecast.forecastday[0].day.maxtemp_c = 16
// eslint-disable-next-line
testBAWeatherData.forecast.forecastday[0].day.mintemp_c = 2

testBAWeatherData.forecast.forecastday[1].day.condition.text = 'Patchy rain possible'
// eslint-disable-next-line
testBAWeatherData.forecast.forecastday[1].day.maxtemp_c = 10
// eslint-disable-next-line
testBAWeatherData.forecast.forecastday[1].day.mintemp_c = 5

describe('WeekForecastElement component test', () => {
  test('returns div element with today forecast', () => {
    const { container } = render(
      <WeekForecastElement forecast={testBAWeatherData.forecast.forecastday[0]} isToday={true} />,
    )
    const mainDiv = container.getElementsByClassName('week-forecast-element')[0]
    expect(mainDiv).toBeDefined()
  })

  test('returns elements with todays forecast', () => {
    const { container } = render(
      <WeekForecastElement forecast={testBAWeatherData.forecast.forecastday[0]} isToday={true} />,
    )
    const divTitle = container.getElementsByClassName('week-forecast-element__day')[0]
    const divCondition = container.getElementsByClassName(
      'week-forecast-element__symbol-description',
    )[0]
    const image = screen.getByAltText('Symbol image of weather')
    const divTemp = container.getElementsByClassName('week-forecast-element__temp')[0]
    expect(divTitle.textContent).toBe('Today')
    expect(divCondition.textContent).toBe('Sunny')
    expect(image).toBeDefined()
    expect(divTemp.textContent).toBe('16/2')
  })

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getDay').mockReturnValue(4)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('returns elements with forecast for Thursday (Thu)', () => {
    const { container } = render(
      <WeekForecastElement forecast={testBAWeatherData.forecast.forecastday[1]} isToday={false} />,
    )
    const date = container.getElementsByClassName('week-forecast-element__day')[0]
    const divCondition = container.getElementsByClassName(
      'week-forecast-element__symbol-description',
    )[0]
    const image = screen.getByAltText('Symbol image of weather')
    const divTemp = container.getElementsByClassName('week-forecast-element__temp')[0]
    expect(date.textContent).toBe('Thu')
    expect(divCondition.textContent).toBe('Patchy rain possible')
    expect(image).toBeDefined()
    expect(divTemp.textContent).toBe('10/5')
  })
})

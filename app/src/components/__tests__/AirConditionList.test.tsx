import { render } from '@testing-library/react'
import { AirConditionData } from '../../utils/types'
import { AirConditionList } from '../AirCondition/AirConditionList'

const airConditionData: AirConditionData[] = [
  {
    condition: 'Wind speed',
    iconURL: '/image_speed.png',
    value: 5,
    variable: 'wind_speed',
    unit: 'km/h',
  },
  {
    condition: 'Wind direction',
    iconURL: '/image_direction.png',
    value: 'NW',
    variable: 'wind_direction',
    unit: '',
  },
]

describe('tests AirConditionList component', () => {
  test('should render element with the Title Wind speed', () => {
    const { container } = render(<AirConditionList data={airConditionData} />)
    const title = container.getElementsByClassName('air-condition-element__title')[0]
    expect(title.textContent).toBe('Wind speed')
  })

  test('should render image element', () => {
    const { container } = render(<AirConditionList data={airConditionData} />)
    const weatherIMG = container.querySelectorAll('img')[0] as HTMLImageElement
    // eslint-disable-next-line
    expect(weatherIMG.alt).toContain("Image of condition's symbol")
    expect(weatherIMG.src).toContain('/image_speed.png')
  })

  test('should render element with right wind speed value', () => {
    const { container } = render(<AirConditionList data={airConditionData} />)

    const temp = container.querySelector('.air-condition-element__value')
    expect(temp?.textContent).toBe('5 km/h')
  })

  test('should render element with the Wind direction', () => {
    const { container } = render(<AirConditionList data={airConditionData} />)
    const title = container.getElementsByClassName('air-condition-element__title')[1]
    expect(title.textContent).toBe('Wind direction')
  })

  test('should render image element', () => {
    const { container } = render(<AirConditionList data={airConditionData} />)
    const weatherIMG = container.querySelectorAll('img')[1] as HTMLImageElement
    // eslint-disable-next-line
    expect(weatherIMG.alt).toContain("Image of condition's symbol")
    expect(weatherIMG.src).toContain('/image_direction.png')
  })

  test('should render element with right wind direction', () => {
    const { container } = render(<AirConditionList data={airConditionData} />)

    const temp = container.querySelectorAll('.air-condition-element__value')[1]
    expect(temp?.textContent).toBe('NW ')
  })
})

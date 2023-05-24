import { AirConditionData, WeatherData } from './types'
import { airConditionImages } from '../data/airConditions'

type key = 'wind_kph' | 'wind_dir' | 'feelslike_c' | 'uv' | 'humidity'

export const filterConditionData = (weatherData: WeatherData): AirConditionData[] => {
  const result = airConditionImages.map((element: AirConditionData) => {
    const variable = element.variable as key
    const value = weatherData.current[variable]
    element.value = value
    return element
  })

  return result
}

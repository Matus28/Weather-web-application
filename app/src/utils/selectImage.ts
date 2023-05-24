import { WeatherCondition } from './types'
import { ConditionImages, ConditionImagesURL } from '../data/conditions'

export const selectImage = (
  data: WeatherCondition,
  isDay: boolean,
  type: string,
  ConditImgsURL: ConditionImages[] = ConditionImagesURL,
): string => {
  const dayTime = isDay ? 'day' : 'night'
  const condition = data.text

  const filteredCondition = ConditImgsURL.filter(
    (imageCondition: ConditionImages) => imageCondition.condition === condition,
  )[0]

  if (!filteredCondition) return ''

  const filteredType = filteredCondition[type === 'current' ? 'current' : 'forecast']

  return filteredType[dayTime === 'day' ? 'day' : 'night']
}

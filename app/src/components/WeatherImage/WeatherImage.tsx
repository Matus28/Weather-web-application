import * as React from 'react'
import { selectImage } from '../../utils/selectImage'
import { WeatherCondition } from '../../utils/types'
import './WeatherImage.css'

interface WeatherImageProps {
  data: WeatherCondition
  isDay: boolean
  type: 'current' | 'forecast'
}

export const WeatherImage = (props: WeatherImageProps): JSX.Element => {
  const [url, setUrl] = React.useState<string>('')

  React.useEffect(() => {
    const newURL = selectImage(props.data, props.isDay, props.type)
    setUrl(newURL)
  }, [props.data])

  return <img alt='Symbol image of weather' src={url} />
}

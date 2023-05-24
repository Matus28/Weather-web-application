import { City, WeatherData } from '../../utils/types'
import { CircleButton } from '../Button/CustomizedButton'
import { Card } from '../Card/Card'
import { WeatherImage } from '../WeatherImage/WeatherImage'
import ClearIcon from '@mui/icons-material/Clear'
import './CityBlock.css'

const CityBlock = (props: {
  city: City
  data: WeatherData
  isSelected: boolean
  onSelect: (data: WeatherData) => void
  onRemove: (cityId: string, cityName: string) => void
}): JSX.Element => {
  const time = new Date(props.data.location.localtime).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleRemoveCity = (event: React.MouseEvent): void => {
    // Stop event propagation (only remove, not select event)
    event.stopPropagation()
    props.onRemove(props.city._id, props.city.cityName)
  }
  return (
    <Card isSelected={props.isSelected} class='city'>
      <div className='city-block' tabIndex={0} onClick={() => props.onSelect(props.data)}>
        <WeatherImage
          data={props.data.current.condition}
          isDay={props.data.current.is_day ? true : false}
          type='forecast'
        />
        <div className='city-block-description'>
          <div className='city-block-description__name'>{props.data.location.name}</div>
          <div className='city-block-description__time'>{time}</div>
        </div>
        <div className='city-block-temp'>{`${Math.round(props.data.current.temp_c)}°C`}</div>
        <CircleButton onClick={handleRemoveCity}>
          <ClearIcon />
        </CircleButton>
      </div>
    </Card>
  )
}

export default CityBlock

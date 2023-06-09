import { Forecast } from '../../utils/types'
import { Card } from '../Card/Card'
import { TodayForecastList } from './TodayForecastList'
import './TodayForecast.css'

export const TodayForecast = (props: { forecastData: Forecast }): JSX.Element => {
  // eslint-disable-next-line
  const title = `Today's forecast`
  return (
    <Card class='today-forecast'>
      <div className='today-forecast'>
        <div className='today-forecast__title'>{title}</div>
        <TodayForecastList forecastData={props.forecastData} start={6} end={21} step={3} />
      </div>
    </Card>
  )
}

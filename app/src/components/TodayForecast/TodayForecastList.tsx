import { Forecast, ForecastHour } from '../../utils/types'
import { TodayForecastElement } from './TodayForecastElement'
import './TodayForecastList.css'

export const TodayForecastList = (props: {
  forecastData: Forecast
  start: number
  end: number
  step: number
}): JSX.Element => {
  const timeIndex: string[] = []

  for (let i: number = props.start; i <= props.end; i += props.step) {
    timeIndex.push(i.toString())
  }

  const filteredHours = props.forecastData.hour.filter((hour: ForecastHour, index: number) => {
    return timeIndex.includes(index.toString())
  })

  return (
    <div className='today-forecast-list'>
      {filteredHours &&
        filteredHours.map((hour: ForecastHour, index: number) => {
          return <TodayForecastElement key={index} forecastHour={hour} />
        })}
    </div>
  )
}

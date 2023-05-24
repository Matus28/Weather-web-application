import { AirConditionData } from '../../utils/types'
import { AirConditionElement } from './AirConditionElement'
import './AirConditionList.css'

export const AirConditionList = (props: { data: AirConditionData[] }): JSX.Element => {
  return (
    <div className='air-condition-list'>
      {props.data &&
        props.data.map((element: AirConditionData, index: number) => {
          return <AirConditionElement key={index} data={element} />
        })}
    </div>
  )
}

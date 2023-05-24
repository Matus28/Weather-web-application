import { AirConditionData } from '../../utils/types'
import './AirConditionElement.css'

export const AirConditionElement = (props: { data: AirConditionData }): JSX.Element => {
  return (
    <div className='air-condition-element'>
      <div className='air-condition-element__description'>
        <img src={props.data.iconURL} alt="Image of condition's symbol" />
        <div className='air-condition-element__title'>{props.data.condition}</div>
      </div>
      <div className='air-condition-element__value'>{`${props.data.value} ${props.data.unit}`}</div>
    </div>
  )
}

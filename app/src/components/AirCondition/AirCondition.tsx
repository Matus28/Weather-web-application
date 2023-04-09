import { filterConditionData } from "../../utils/filterConditionData";
import { WeatherData } from "../../utils/types";
import { Card } from "../Card/Card";
import { AirConditionList } from "./AirConditionList";
import "./AirCondition.css";

export const AirCondition = (props: {
  weatherData: WeatherData;
}): JSX.Element => {
  const airConditionData = filterConditionData(props.weatherData);
  return (
    <Card>
      <div className="air-condition">
        <div className="air-condition__title">Air condition</div>
        <AirConditionList data={airConditionData} />
      </div>
    </Card>
  );
};

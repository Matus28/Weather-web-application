import { Forecast } from "../../utils/types";
import { Card } from "../Card/Card";
import { WeekForecastList } from "./WeekForecastList";
import "./WeekForecast.css";

export const WeekForecast = (props: {
  forecastData: Forecast[];
}): JSX.Element => {
  return (
    <Card class="week-forecast">
      <div className="week-forecast">
        <div className="week-forecast__title">7 day forecast</div>
        <WeekForecastList forecastData={props.forecastData} days={7} />
      </div>
    </Card>
  );
};

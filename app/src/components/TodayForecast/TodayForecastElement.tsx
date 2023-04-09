import { ForecastHour } from "../../utils/types";
import { Card } from "../Card/Card";
import { WeatherImage } from "../WeatherImage/WeatherImage";
import "./TodayForecastElement.css";

export const TodayForecastElement = (props: {
  forecastHour: ForecastHour;
}): JSX.Element => {
  const time = new Date(props.forecastHour.time).toLocaleTimeString(
    navigator.language,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <Card color="white" class="today-forecast-element">
      <div className="today-forecast-element">
        <div className="today-forecast-element__time">{time}</div>
        <div className="today-forecast-element__symbol">
          <WeatherImage
            data={props.forecastHour.condition}
            isDay={props.forecastHour.is_day ? true : false}
            type="forecast"
          />
        </div>
        <div className="week-forecast-element__temp">
          {`${Math.round(props.forecastHour.temp_c)}°C`}
        </div>
      </div>
    </Card>
  );
};

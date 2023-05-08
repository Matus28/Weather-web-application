import { Forecast } from "../../utils/types";
import { WeatherImage } from "../WeatherImage/WeatherImage";
import "./WeekForecastElement.css";

export const WeekForecastElement = (props: {
  forecast: Forecast;
  isToday: boolean;
}): JSX.Element => {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(props.forecast.date);
  const day = date.getDay();

  return (
    <div className="week-forecast-element">
      <div className="week-forecast-element__day">
        {props.isToday ? "Today" : weekday[day]}
      </div>
      <WeatherImage
        data={props.forecast.day.condition}
        isDay={true}
        type="forecast"
      />
      <div className="week-forecast-element__symbol-description">
        {props.forecast.day.condition.text}
      </div>
      <div className="week-forecast-element__temp">
        {`${Math.round(props.forecast.day.maxtemp_c)}/${Math.round(
          props.forecast.day.mintemp_c
        )}`}
      </div>
    </div>
  );
};

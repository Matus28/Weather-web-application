import { Forecast } from "../../utils/types";
import { WeekForecastElement } from "./WeekForecastElement";

export const WeekForecastList = (props: {
  forecastData: Forecast[];
  days: number;
}): JSX.Element => {
  const filteredForecast = props.forecastData.filter(
    (day: Forecast, index: number) => index < props.days
  );
  return (
    <div className="week-forecast-list">
      {filteredForecast &&
        filteredForecast.map((day: Forecast, index: number) => {
          return (
            <div key={index}>
              <WeekForecastElement
                key={(index + 1) * Math.random() * 1000}
                forecast={day}
                isToday={index === 0 ? true : false}
              />
              {index < filteredForecast.length - 1 ? <hr /> : ""}
            </div>
          );
        })}
    </div>
  );
};

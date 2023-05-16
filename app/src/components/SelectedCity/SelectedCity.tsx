import * as React from "react";
import { WeatherData } from "../../utils/types";
import { Card } from "../Card/Card";
import { WeatherImage } from "../WeatherImage/WeatherImage";
import { TodayForecastList } from "../TodayForecast/TodayForecastList";
import { WeekForecastList } from "../WeekForecast/WeekForecastList";
import "./SelectedCity.css";

const CityComponent = (props: { data: WeatherData | null }): JSX.Element => {
  return (
    <Card class="selected-city">
      <div className="selected-city-weather">
        <div className="selected-city-weather__main">
          {props.data && (
            <WeatherImage
              data={props.data.current.condition}
              isDay={props.data.current.is_day ? true : false}
              type="current"
            />
          )}
          <div className="selected-city-weather__temp">
            {props.data && (
              <h1>{`${Math.round(props.data.current.temp_c)}°C`}</h1>
            )}
          </div>
        </div>
        <div className="selected-city-weather__city">
          {props.data && <h1>{props.data.location.name}</h1>}
        </div>
        <div className="selected-city-weather__rain">
          {props.data &&
            `Chance of rain: ${props.data.forecast.forecastday[0].day.daily_chance_of_rain}%`}
        </div>
        <div className="selected-city-weather__today-forecast">
          <div className="selected-city-weather__today-forecast__title">
            Today's forecast
          </div>
          {props.data && (
            <TodayForecastList
              forecastData={props.data.forecast.forecastday[0]}
              start={6}
              end={22}
              step={8}
            />
          )}
        </div>
        <div className="selected-city-weather__three-days-forecast">
          <div className="selected-city-weather__three-days-forecast__title">
            3 day forecast
          </div>
          {props.data && (
            <WeekForecastList
              forecastData={props.data?.forecast.forecastday}
              days={3}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export const SelectedCity = React.memo(CityComponent);

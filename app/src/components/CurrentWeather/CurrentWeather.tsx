import { WeatherData } from "../../utils/types";
import { CircleButton } from "../Button/CustomizedButton";
import { Card } from "../Card/Card";
import { ControlledSwitch } from "../Switch/ControlledSwitch";
import { WeatherImage } from "../WeatherImage/WeatherImage";
import AddIcon from "@mui/icons-material/Add";
import "./CurrentWeather.css";

const CurrentWeather = (props: {
  weatherData: WeatherData;
  isChecked: boolean;
  onAddCity: () => void;
  onCheck: (value: boolean) => void;
}): JSX.Element => {
  return (
    <Card class="current-weather">
      <div className="current-weather">
        <div className="current-weather__add">
          <CircleButton onClick={props.onAddCity}>
            <AddIcon fontSize="large" />
          </CircleButton>
        </div>
        <div className="current-weather-switch">
          <ControlledSwitch
            isChecked={props.isChecked}
            onCheck={props.onCheck}
          />
          <p>Default city</p>
        </div>
        <WeatherImage
          data={props.weatherData.current.condition}
          isDay={props.weatherData.current.is_day ? true : false}
          type="current"
        />
        <div className="current-weather__city">
          <h1>{props.weatherData.location.name}</h1>
        </div>
        <div className="current-weather__rain">{`Chance of rain: ${props.weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`}</div>
        <div className="current-weather__temp">
          <h1>{`${props.weatherData.current.temp_c}°C`}</h1>
        </div>
        <div className="current-weather__condition">
          <h2>{props.weatherData.current.condition.text}</h2>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;

import { AirConditionData } from "../utils/types";
import WindSpeed from "/public/img/air-condition/wind.png";
import WindDirection from "/public/img/air-condition/wind-direction.png";
import RealFeel from "/public/img/air-condition/temp.png";
import UVIndex from "/public/img/air-condition/uv-index.png";
import Humidity from "/public/img/air-condition/raindrop.png";

export const airConditionImages: AirConditionData[] = [
  {
    condition: "Wind speed",
    iconURL: WindSpeed,
    value: "",
    variable: "wind_kph",
    unit: "km/h",
  },
  {
    condition: "Wind direction",
    iconURL: WindDirection,
    value: "",
    variable: "wind_dir",
    unit: "",
  },
  {
    condition: "Real feel",
    iconURL: RealFeel,
    value: "",
    variable: "feelslike_c",
    unit: "°C",
  },
  {
    condition: "UV Index",
    iconURL: UVIndex,
    value: "",
    variable: "uv",
    unit: "",
  },
  {
    condition: "Humidity",
    iconURL: Humidity,
    value: "",
    variable: "humidity",
    unit: "%",
  },
];

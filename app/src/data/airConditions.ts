import { AirConditionData } from "../utils/types";

export const airConditionImages: AirConditionData[] = [
  {
    condition: "Wind speed",
    iconURL: "../../../public/img/air-condition/wind.png",
    value: "",
    variable: "wind_kph",
    unit: "km/h",
  },
  {
    condition: "Wind direction",
    iconURL: "../../../public/img/air-condition/wind-direction.png",
    value: "",
    variable: "wind_dir",
    unit: "",
  },
  {
    condition: "Real feel",
    iconURL: "../../../public/img/air-condition/temp.png",
    value: "",
    variable: "feelslike_c",
    unit: "°C",
  },
  {
    condition: "UV Index",
    iconURL: "../../../public/img/air-condition/uv-index.png",
    value: "",
    variable: "uv",
    unit: "",
  },
  {
    condition: "Humidity",
    iconURL: "../../../public/img/air-condition/raindrop.png",
    value: "",
    variable: "humidity",
    unit: "%",
  },
];
